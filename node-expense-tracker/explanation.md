# Expense Tracker Explanation

This project is a small full-stack Node.js app built with:

- `Node.js` for running JavaScript on the server
- `Express` for handling routes, middleware, and HTTP requests
- `EJS` for generating HTML on the server
- `MongoDB` for storing expense data
- `Mongoose` for talking to MongoDB using models and schemas
- `dotenv` for loading environment variables from `.env`

## 1. Big Picture Flow

The app flow is:

1. The browser sends a request.
2. Express receives the request in `server.js`.
3. Middleware prepares the request.
4. The matching route handler runs.
5. The route talks to MongoDB through the `Expense` model.
6. Express either:
   - renders an EJS view, or
   - redirects the browser to another route.
7. The browser shows the updated page.

## 2. Project Structure

- `server.js`: main entry point of the app
- `config/db.js`: connects the app to MongoDB
- `models/expense.js`: defines the expense schema and model
- `views/home.ejs`: UI template rendered by the server
- `public/style.css`: static CSS file served to the browser
- `package.json`: project metadata, dependencies, and scripts

## 3. What Happens in `server.js`

`server.js` is the heart of the app.

It does these jobs:

1. Imports libraries and local files
2. Creates the Express app
3. Loads environment variables
4. Connects to MongoDB
5. Registers middleware
6. Defines routes
7. Starts the server

### Imports

```js
import express from "express";
import { config } from "dotenv";
import connectDB from "./config/db.js";
import Expense from "./models/expense.js";
```

What each import does:

- `express`: creates the server and handles routes
- `config` from `dotenv`: loads `.env` values into `process.env`
- `connectDB`: custom function to connect MongoDB
- `Expense`: Mongoose model for expense data

### Create the app

```js
const app = express();
```

This creates the Express application object.

You use `app` to:

- add middleware with `app.use()`
- create routes with `app.get()`, `app.post()`, or `app.route()`
- start the server with `app.listen()`

### Environment variables

```js
config();
```

This loads variables from `.env`.

Common examples:

- `PORT=3000`
- `MONGO_URI=your-mongodb-connection-string`

After `config()`, you can access them like:

```js
process.env.PORT
process.env.MONGO_URI
```

### Database connection

```js
connectDB();
```

This calls the MongoDB connection function before requests start coming in.

If the database is not connected, the app cannot safely read or write expenses.

## 4. Middleware Concept

Middleware is code that runs between receiving a request and sending a response.

Think of it like a checkpoint in the request flow.

This project uses:

```js
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
```

### `express.static("public")`

This serves static files directly from the `public` folder.

Example:

- browser asks for `/style.css`
- Express sends `public/style.css`

Without this middleware, the CSS file would not load.

### `express.urlencoded({ extended: true })`

This parses form data sent from HTML forms.

When the user submits:

```html
<input name="name" />
<input name="amount" />
```

Express converts the submitted form data into:

```js
req.body = {
  name: "...",
  amount: "..."
};
```

Without this middleware, `req.body` would be `undefined` for form submissions.

### `app.set("view engine", "ejs")`

This tells Express to use EJS when calling:

```js
res.render("home", data);
```

Express automatically looks inside the `views` folder for `home.ejs`.

## 5. Routes Concept

Routes decide what code runs for a given URL and HTTP method.

A route is usually:

- a path like `/`
- an HTTP method like `GET` or `POST`
- a handler function like `(req, res) => {}`

### In this app

#### GET `/`

Purpose:

- fetch all expenses from MongoDB
- calculate total amount
- render the home page

Code idea:

```js
app.route("/").get(async (req, res) => {
  const expenses = await Expense.find({});
  res.render("home", { expenses, total });
});
```

#### POST `/add-expense`

Purpose:

- read submitted form data
- validate it
- insert a new expense into MongoDB
- redirect back to `/`

#### POST `/delete/:id`

Purpose:

- read the `id` from the URL
- find and delete the matching expense
- redirect back to `/`

### Route parameters

In this route:

```js
"/delete/:id"
```

`:id` is called a route parameter.

If the browser sends:

```txt
/delete/67f01abc123
```

then Express gives:

```js
req.params.id
```

## 6. `req` and `res`

Every Express route handler receives:

- `req` = request object
- `res` = response object

### `req`

Contains information coming from the client:

- `req.body`: form data
- `req.params`: route parameters
- `req.query`: query string values

Examples in this project:

```js
req.body.name
req.body.amount
req.params.id
```

### `res`

Used to send something back to the browser:

- `res.render()` to send HTML
- `res.redirect()` to tell the browser to load another URL
- `res.send()` to send plain text or data
- `res.json()` to send JSON

This project mainly uses:

- `res.render("home", data)`
- `res.redirect("/")`

## 7. Async/Await Concept

This is one of the most important concepts in this project.

### Why we need async/await

Database operations take time.

Examples:

- finding documents
- inserting documents
- deleting documents

JavaScript does not want to freeze the whole server while waiting.

So functions like:

- `Expense.find()`
- `Expense.create()`
- `Expense.findByIdAndDelete()`
- `mongoose.connect()`

return promises.

### `async`

When you write:

```js
async (req, res) => {}
```

you are saying:

- this function may wait for asynchronous work
- inside it, you can use `await`

### `await`

When you write:

```js
const expenses = await Expense.find({});
```

you are saying:

- start the database query
- pause this function until the result comes back
- then store the result in `expenses`

This makes asynchronous code look easier to read, almost like synchronous code.

### Why `try/catch` is used

When async code fails, it can throw an error.

So we wrap route logic in:

```js
try {
  ...
} catch (err) {
  ...
}
```

This prevents the server from crashing because of one failed query.

## 8. Mongoose Concept

Mongoose is an ODM.

ODM means Object Data Modeling.

It helps us:

- define data structure
- validate data
- talk to MongoDB using JavaScript methods

### Schema

In `models/expense.js`:

```js
const expenseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
});
```

This schema says:

- every expense must have a `name`
- every expense must have an `amount`
- `name` should be unique
- `name` should be trimmed and stored in lowercase
- `amount` should be a number and cannot be below `0`

### Model

```js
const Expense = mongoose.model("expense", expenseSchema);
```

The model gives access to database methods such as:

- `Expense.find({})`
- `Expense.create({...})`
- `Expense.findById(id)`
- `Expense.findByIdAndDelete(id)`

You can think of:

- schema = rules
- model = tool that uses those rules to read/write data

## 9. Database Connection Flow

Inside `config/db.js`:

```js
const conn = await mongoose.connect(process.env.MONGO_URI);
```

This means:

1. Read the database connection string from `.env`
2. Ask Mongoose to connect to MongoDB
3. Wait until the connection succeeds
4. If connection fails, catch the error and stop the app

Stopping the app with `process.exit(1)` is useful here because running without a database would leave the app in a broken state.

## 10. EJS Concept

EJS stands for Embedded JavaScript.

It lets us mix:

- HTML
- JavaScript
- data sent from Express

### `res.render("home", { expenses, total })`

When Express renders the view, EJS receives:

- `expenses`
- `total`

Inside `home.ejs`, we can use those values.

### EJS syntax used in this project

#### Print a value

```ejs
<%= total %>
```

This prints the value into the HTML.

#### Run JavaScript without printing

```ejs
<% if (expenses.length > 0) { %>
```

This runs logic, but does not directly print anything.

#### Loop through data

```ejs
<% expenses.forEach(expenseObj => { %>
```

This repeats part of the HTML for every expense.

## 11. Form Submission Flow

When a user adds an expense:

1. User fills the form in `home.ejs`
2. Browser sends `POST /add-expense`
3. Express parses form fields with `express.urlencoded()`
4. Values become available in `req.body`
5. Route validates the values
6. `Expense.create()` stores the new expense in MongoDB
7. Server redirects to `/`
8. Browser sends a new `GET /`
9. Updated data is fetched and displayed

This pattern is very common in server-rendered apps.

## 12. Delete Flow

When a user clicks delete:

1. Browser submits `POST /delete/:id`
2. Express reads `req.params.id`
3. App checks whether the expense exists
4. App deletes the matching document
5. Server redirects to `/`
6. Browser reloads the updated list

## 13. Why Redirect Is Used

After add or delete, the code uses:

```js
res.redirect("/");
```

This tells the browser:

- "go make a fresh request to the home page"

That is useful because:

- the user sees updated data
- refreshing the page stays simple
- the route that changes data does not need to render the view itself

## 14. Validation Concept

This app uses validation in two places:

### In the route

The route checks for:

- empty name
- invalid amount
- amount less than or equal to zero

This gives quick protection before saving data.

### In the schema

The schema checks rules like:

- required fields
- unique name
- amount minimum

This gives database-level protection.

Best practice is to validate in both places.

## 15. Why `amount` Should Be Number

If amount is stored as a string:

- `"100"` is text, not a number
- math needs manual conversion

If amount is stored as a number:

- totals become easier
- validation becomes stronger
- Mongoose can enforce numeric rules

That is why using `Number` in the schema is better for this project.

## 16. Request-Response Cycle in One Example

Example: loading the home page

1. Browser requests `GET /`
2. Express matches the `/` route
3. Route runs async function
4. `await Expense.find({})` gets data from MongoDB
5. Total is calculated in JavaScript
6. `res.render("home", { expenses, total })` builds HTML
7. HTML is sent to the browser
8. Browser requests `/style.css`
9. `express.static("public")` serves CSS
10. User sees the final page

## 17. Concepts Summary

### Node.js

Runs JavaScript outside the browser.

### Express

Framework for routing, middleware, and responses.

### Middleware

Runs before route handlers and prepares the request/response flow.

### Route

Defines what should happen for a specific URL and HTTP method.

### Async/Await

Handles asynchronous operations like database queries in readable code.

### Promise

Represents a value that will be available now, later, or fail.

### MongoDB

NoSQL database that stores data as documents.

### Mongoose

Adds schemas, models, validation, and query helpers for MongoDB.

### EJS

Template engine that lets the server generate HTML with data.

### Render

Create HTML from a template and send it to the client.

### Redirect

Tell the browser to visit another route.

## 18. Interview-Style Understanding Checks

You should be able to explain these after reading the project:

1. Why do we need `express.urlencoded()`?
2. Why are the route handlers marked `async`?
3. What is the difference between a schema and a model?
4. Why do we use `res.render()` on `/` but `res.redirect()` after add/delete?
5. Where does `req.body` come from?
6. Where does `req.params.id` come from?
7. Why is `await` needed before database methods?
8. Why is EJS useful in a server-rendered app?

## 19. End-to-End Mental Model

Keep this mental model in mind:

- Express handles incoming requests
- middleware prepares request data
- routes contain app logic
- Mongoose talks to MongoDB
- EJS renders UI using data from the route
- redirects restart the browser flow after data changes

That full chain is the main "flow" of this project.
