# Server And DB Guide

This note focuses only on `server.js` and `config/db.js`. These two files are extremely important because they power the backend of the blog app.

For a beginner, these files can feel confusing at first because they mix app setup, routing, database logic, and error handling. We will break them into small pieces.

## 1. What Is `server.js`?

`server.js` is the entry point of the project.

When you run your app, this file:

- starts Express
- loads environment variables
- connects the database
- sets middleware
- defines routes
- listens for incoming requests

You can think of `server.js` as the control room of your application.

## 2. What Is `db.js`?

`config/db.js` is only responsible for one thing:

- connecting the app to MongoDB

This is actually a very good practice.

Why?

Because it keeps database connection logic separate from route logic.

That makes your code cleaner and easier to understand.

## 3. Deep Explanation Of `config/db.js`

```js
import mongoose from "mongoose";
```

`mongoose` is the package used to talk to MongoDB in a structured way.

It helps with:

- connecting to the database
- defining schemas
- creating models
- validating data

### The connection function

```js
async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("DB CONNECTED :", conn.connection.host);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}
```

Let us understand every part.

#### `async function connectDB()`

This means the function is asynchronous.

Why?

Because database connection takes time.

JavaScript needs to wait for it.

#### `await mongoose.connect(process.env.MONGO_URI)`

This tries to connect to MongoDB using the connection string stored in `.env`.

Example:

```env
MONGO_URI=mongodb://127.0.0.1:27017/blogapp
```

This is better than hardcoding the string directly in your code.

Why?

- safer
- easier to change later
- better for deployment

#### `conn.connection.host`

If the connection is successful, this prints which database host was connected.

This helps you confirm that the database is working.

#### `catch (err)`

If MongoDB fails to connect:

- the error is printed
- `process.exit(1)` stops the app

This is important because if your database is not connected, your blog routes will not work properly anyway.

## 4. Deep Explanation Of `server.js`

### Express setup

```js
import express from "express";
const app = express();
```

This creates the Express app object.

Everything in the server is built from `app`.

### Environment setup

```js
import { config } from "dotenv";
config();
```

This loads variables from `.env`.

Without `config()`, `process.env.MONGO_URI` might be undefined.

### Database connection

```js
import connectDB from "./config/db.js";
connectDB();
```

This calls the database connection function right after setup.

The app should connect to the database before handling requests.

### Model import

```js
import Blog from "./model/blog.js";
```

This gives access to the `Blog` model so routes can:

- create blogs
- fetch all blogs
- fetch one blog

## 5. Middleware In `server.js`

### Static files middleware

```js
app.use(express.static("public"));
```

This tells Express:

"If the browser asks for a static file, look inside the `public` folder."

Example:

- browser asks for `/css/base.css`
- Express returns `public/css/base.css`

### Form body middleware

```js
app.use(express.urlencoded({ extended: true }));
```

This is needed for HTML forms.

When a user submits:

- title
- description
- category

that data becomes available inside:

```js
req.body
```

Without this middleware, `req.body` would be empty.

### View engine setup

```js
app.set("view engine", "ejs");
```

This tells Express to use EJS for rendering pages.

That is why:

```js
res.render("Home");
```

works without writing `.ejs`.

## 6. Route Logic Deep Dive

### Route 1: Home

```js
app.route("/").get((req, res) => res.render("Home"));
```

Very simple route.

It only shows the homepage.

No database needed here.

### Route 2: Compose

```js
app.route("/compose")
```

This route is chained, which means both GET and POST are attached to the same path.

#### GET

```js
.get((req, res) => res.render("Compose"))
```

Shows the form page.

#### POST

This receives the submitted form.

```js
const { title, description, category } = req.body;
```

This extracts form values.

#### Validation 1: empty fields

```js
if (!title || !description || !category)
```

This stops blank submissions.

#### Validation 2: minimum length

```js
if (title.length < 20 || description.length < 100)
```

This makes the route match the schema expectations.

This is good because:

- users get filtered early
- invalid data is less likely to hit MongoDB

#### Blog creation

```js
await Blog.create({
  title: title,
  description: description,
  category: category,
});
```

This saves a new document into MongoDB.

After success:

```js
res.redirect("/blog");
```

The user is taken to the page that lists all blogs.

### Route 3: Blog listing

```js
const blogs = await Blog.find({});
```

This fetches all blog documents.

Then:

```js
res.render("blog", { blogs });
```

Now the template receives all blog data.

### Route 4: Blog details

```js
const blog = await Blog.findById({ _id: blogId });
```

This fetches one blog using its MongoDB id.

#### If no blog is found

```js
return res.status(404).render("Post", {
  blog: null,
});
```

This is better than redirecting because:

- the user sees a meaningful page
- the URL still reflects the request they made
- the status code is correct

#### If the blog exists

```js
res.render("Post", { blog });
```

Now `Post.ejs` can print the full data.

## 7. Why `try/catch` Is Used

Each async route uses `try/catch`.

That is because:

- database queries can fail
- invalid ids can throw errors
- network problems can happen

Without `try/catch`, the server may crash or the error may be unhandled.

With `try/catch`, you can:

- log the error
- show fallback behavior
- keep the app alive

## 8. Request And Response Cycle

This is a very important beginner concept.

When a user opens a page, this happens:

1. Browser sends request
2. Express receives request
3. Matching route runs
4. Route may talk to database
5. Route sends response

Examples:

- `/`
  Express sends `Home.ejs`

- `/blog`
  Express fetches blogs from MongoDB, then sends `Blog.ejs`

- `/compose` with POST
  Express reads form data, saves it, then redirects

- `/blog-details/:id`
  Express finds one blog and renders `Post.ejs`

## 9. Why This Project Structure Is Good For Beginners

Your current structure is actually a nice learning structure because responsibilities are separated:

- `server.js`
  routing and app setup

- `config/db.js`
  database connection

- `model/blog.js`
  data structure rules

- `views/`
  UI pages

- `public/`
  CSS files

This separation makes the code easier to debug and easier to grow later.

## 10. Beginner Mistakes To Watch For

### Forgetting `express.urlencoded`

Result:

- form submits
- `req.body` is empty

### Forgetting `config()`

Result:

- `process.env.MONGO_URI` may be undefined
- DB connection fails

### Wrong render names

Example:

```js
res.render("blog");
```

Your file is `views/Blog.ejs`.

On some systems, file name case matters.

So it is safer to keep names consistent.

### Redirect loops

Example:

If a route fails and redirects back to itself repeatedly, the browser can get stuck.

That is why fallback rendering is sometimes better than redirecting.

## 11. Final Simple Summary

If you want the shortest understanding:

- `db.js` connects MongoDB
- `server.js` starts Express and creates routes
- routes talk to the model
- model talks to MongoDB
- `res.render()` sends data to EJS

That is the full backend cycle in your current project.
