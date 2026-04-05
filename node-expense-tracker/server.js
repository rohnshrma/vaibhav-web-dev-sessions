import express from "express";
import { config } from "dotenv";
import connectDB from "./config/db.js";
import Expense from "./models/expense.js";

/*
  `express()` creates our server application.
  Think of `app` as the central object that controls:
  1. middleware
  2. routes
  3. app settings
  4. starting the server
*/
const app = express();

/*
  `config()` reads the `.env` file and places its values inside `process.env`.
  Example:
  - if `.env` has PORT=5000
  - then we can access it with `process.env.PORT`

  We usually do this at the top of the app because many other files depend on env values.
*/
config();

/*
  This starts the MongoDB connection as soon as the app boots.
  The app can technically start listening before MongoDB is ready, but for learning
  and for safer behavior, we connect early so database features are available.
*/
connectDB();

const PORT = process.env.PORT || 3000;

/*
  Middleware is code that runs during the request-response cycle before the final
  route handler sends a response.

  `express.static("public")` serves files directly from the `public` folder.
  Example:
  - browser asks for `/style.css`
  - Express looks inside `public/style.css`
  - if found, it sends that file automatically

  This is why our CSS works in the browser.
*/
app.use(express.static("public"));

/*
  HTML forms usually send data in URL-encoded format.
  This middleware reads that incoming form data and converts it into a JavaScript object.

  Example:
  - the form sends `name=food&amount=250`
  - Express converts it to:
    req.body = { name: "food", amount: "250" }

  Without this middleware, `req.body` would be undefined for form submissions.
*/
app.use(express.urlencoded({ extended: true }));

/*
  This tells Express that when we call `res.render("home")`,
  it should use the EJS template engine and look for `views/home.ejs`.

  EJS allows us to mix HTML + JavaScript + dynamic data from the server.
*/
app.set("view engine", "ejs");

/*
  A helper function keeps the route cleaner.
  It receives the full expenses array and returns one final total.

  `reduce` works like this:
  - start with `0`
  - go through every expense one by one
  - keep adding `expense.amount` to the running total
*/
const calculateTotalExpenses = (expenses) =>
  expenses.reduce((total, expense) => total + expense.amount, 0);

/*
  Routes are the rules of the application.
  A route answers:
  - which URL was requested?
  - which HTTP method was used? (GET, POST, etc.)
  - what code should run for that request?

  `app.route("/")` groups handlers for the same path.
  Here we only use `.get()`, but Express also allows `.post()`, `.put()`, `.delete()`, etc.

  GET `/` means:
  - user opens the home page
  - server should fetch expenses
  - server should calculate total
  - server should render the page
*/
app.route("/").get(async (req, res) => {
  try {
    /*
      This route handler is marked `async` because database work is asynchronous.

      Why async/await?
      - MongoDB queries take time
      - JavaScript should not block the whole server while waiting
      - `await` pauses only this function, not the entire Node.js process

      `Expense.find({})` means:
      - use the Expense model
      - find all documents
      - `{}` means "no filter", so fetch everything
    */
    const expenses = await Expense.find({});
    console.log("All Expenses =>", expenses);

    /*
      `res.render("home", data)` does server-side rendering.

      Flow:
      1. Express opens `views/home.ejs`
      2. It injects the object values (`expenses`, `total`)
      3. EJS turns the template into plain HTML
      4. That HTML is sent back to the browser

      So the browser does not build the list itself.
      The server builds the HTML first, then sends it.
    */
    res.render("home", {
      expenses,
      total: calculateTotalExpenses(expenses),
    });
  } catch (err) {
    console.log("Error while loading home page =>", err);

    /*
      Redirect means "tell the browser to make a new request to another URL".
      Here it tries to go back to `/`.

      Note:
      If the `/` route itself is failing because of the database, redirecting to `/`
      can repeat the same problem. For now this keeps the flow simple for learning.
    */
    res.redirect("/");
  }
});

/*
  POST `/add-expense` runs when the user submits the form.

  Full flow:
  1. user fills the form in `home.ejs`
  2. browser sends POST request to `/add-expense`
  3. Express parses the form data into `req.body`
  4. this route validates the values
  5. Mongoose creates a new document in MongoDB
  6. server redirects to `/`
  7. browser reloads the home page with updated data
*/
app.route("/add-expense").post(async (req, res) => {
  try {
    /*
      `req.body` contains submitted form values.
      Because browser form values come in as strings, we:
      - trim the name to remove extra spaces
      - convert amount to a real number using `Number(...)`
    */
    const name = req.body.name?.trim();
    const amount = Number(req.body.amount);

    /*
      Validation checks whether the input is safe and meaningful before saving.

      We reject:
      - empty name
      - NaN amount
      - zero or negative amount

      `Number.isNaN(amount)` is important because invalid number conversion gives NaN.
    */
    if (!name || Number.isNaN(amount) || amount <= 0) {
      console.log("Name and amount are invalid");
      return res.redirect("/");
    }

    /*
      `Expense.create(...)` does two things:
      1. validates against the schema
      2. inserts the new expense document into MongoDB

      Because this returns a promise, we use `await`.
    */
    const expense = await Expense.create({
      name,
      amount,
    });

    console.log("expense added =>", expense);
    res.redirect("/");
  } catch (err) {
    console.log("Error while submitting form =>", err);
    res.redirect("/");
  }
});

/*
  POST `/delete/:id` deletes one expense.

  `:id` is called a route parameter.
  Example:
  - URL might be `/delete/67abc123`
  - Express stores that value in `req.params.id`
*/
app.route("/delete/:id").post(async (req, res) => {
  try {
    /*
      `req.params` contains dynamic values from the URL path itself.
      This is different from:
      - `req.body` -> data from form submission
      - `req.query` -> data from the query string
    */
    const { id } = req.params;

    /*
      We first check whether the expense exists.
      This is not strictly required before deleting, but it makes the logic easier to explain:
      - find the document
      - if missing, stop
      - if present, delete it
    */
    const expense = await Expense.findById(id);
    if (!expense) {
      console.log("No Expense Found With given id");
      return res.redirect("/");
    }

    /*
      `findByIdAndDelete(id)` searches by `_id` and removes that document.
      After deletion, we redirect to `/` so the browser requests the updated list again.
    */
    await Expense.findByIdAndDelete(id);
    console.log("Expense Deleted");

    res.redirect("/");
  } catch (err) {
    console.log("Error while deleting item =>", err);
    res.redirect("/");
  }
});

/*
  `app.listen` starts the HTTP server.
  After this line, the app is ready to receive browser requests.

  If PORT is:
  - defined in `.env`, that value is used
  - otherwise, `3000` is used as the fallback
*/
app.listen(PORT, () => console.log("Server Started on PORT :", PORT));
