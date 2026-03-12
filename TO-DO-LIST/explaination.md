# To-Do List App Explanation

This file explains how the current app works.

The app only does two things:

1. Show all tasks.
2. Add a new task.

There is no database yet. All tasks are stored in memory inside `server.js`, so they disappear when the server restarts.

## Project Flow

The request flow is:

1. The browser opens `/`.
2. Express handles the `GET /` route.
3. Express renders `views/index.ejs`.
4. The template receives the `tasks` array and prints it on the page.
5. The user submits the form.
6. The browser sends a `POST /tasks` request.
7. Express reads `req.body.title`.
8. A new task is inserted into the `tasks` array.
9. The server redirects to `/`.
10. The browser reloads the page and now shows the updated list.

## Server Code

File: `server.js`

```js
import express from "express";
```

Line explanation:

- Imports the Express package.
- This package is used to create the web server and define routes.

```js
const app = express();
const PORT = 3000;
```

Line explanation:

- `express()` creates the app instance.
- `app` is used for middleware, routes, and server startup.
- `PORT` stores the port number where the app will run.

```js
const tasks = [];
let nextTaskId = tasks.length + 1;
```

Line explanation:

- `tasks` is the in-memory data store.
- Each task is an object such as `{ id: 1, title: "Study EJS" }`.
- `nextTaskId` tracks the next id to assign.
- `let` is used because the value changes after each new task.

```js
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
```

Block explanation:

- `express.static("public")` exposes files from the `public` folder.
- This is why `/style.css` works in the browser.
- `express.urlencoded({ extended: true })` reads HTML form data and places it into `req.body`.
- `app.set("view engine", "ejs")` tells Express to render `.ejs` templates from the `views` folder.

```js
app.get("/", (req, res) => {
  res.render("index", {
    tasks,
  });
});
```

Block explanation:

- This handles `GET /`.
- `req` is the incoming request object.
- `res` is the outgoing response object.
- `res.render("index", { tasks })` renders `views/index.ejs`.
- The `tasks` array is passed into the template so EJS can display it.

```js
app.post("/tasks", (req, res) => {
  const title = req.body.title?.trim();

  if (title) {
    tasks.unshift({
      id: nextTaskId++,
      title,
    });
  }

  res.redirect("/");
});
```

Block explanation:

- This handles form submissions to `POST /tasks`.
- `req.body.title` reads the input value with `name="title"`.
- `?.trim()` safely removes extra spaces.
- `if (title)` ensures empty strings are not added.
- `tasks.unshift(...)` inserts the newest task at the beginning of the array.
- `id: nextTaskId++` stores the current id, then increments the variable.
- `res.redirect("/")` sends the user back to the home page after adding the task.

Why redirect?

- If the server rendered directly after the POST, refreshing the page could resubmit the form.
- Redirecting creates a safer pattern called Post/Redirect/Get.

```js
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
```

Line explanation:

- Starts the server.
- The callback logs a message when the server is ready.

## Template Code

File: `views/index.ejs`

```html
<form class="task-form" action="/tasks" method="post">
  <label class="sr-only" for="title">New task</label>
  <input
    id="title"
    name="title"
    type="text"
    placeholder="Add a task"
    autocomplete="off"
    required
  />
  <button type="submit">Add</button>
</form>
```

Block explanation:

- The form sends data to `/tasks`.
- `method="post"` tells the browser to send a POST request.
- The label is hidden visually but improves accessibility.
- `id="title"` connects the input to the label.
- `name="title"` is the key that becomes `req.body.title` on the server.
- `required` prevents empty submission in the browser.
- The submit button triggers the form request.

```ejs
<% if (tasks.length === 0) { %>
  <p class="empty-state">No tasks yet.</p>
<% } else { %>
  <ul class="task-list">
    <% tasks.forEach((task) => { %>
      <li class="task-item">
        <span class="task-title"><%= task.title %></span>
      </li>
    <% }) %>
  </ul>
<% } %>
```

Block explanation:

- `<% ... %>` runs JavaScript logic inside the template.
- `if (tasks.length === 0)` checks whether the array is empty.
- If empty, the page shows a fallback message.
- Otherwise, it builds a list of tasks.
- `tasks.forEach(...)` loops through every task object.
- `<%= task.title %>` prints the task title into the HTML.
- EJS escapes the value, which helps prevent raw HTML injection.

## Styling Code

File: `public/style.css`

```css
:root {
  --bg: #f5f7fb;
  --card: #ffffff;
  --text: #1f2937;
  --muted: #6b7280;
  --line: #e5e7eb;
  --accent: #111827;
}
```

Block explanation:

- `:root` stores reusable CSS variables.
- These values centralize the color system.
- If you want to change the design later, update the variables here first.

```css
.task-form {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
  margin-top: 20px;
}
```

Block explanation:

- `display: grid` turns the form into a grid container.
- `grid-template-columns: 1fr auto` makes the input fill available space and the button keep its natural width.
- `gap: 10px` adds spacing between them.
- `margin-top: 20px` separates the form from the text above it.

```css
.task-list {
  list-style: none;
  padding: 0;
  margin: 18px 0 0;
  display: grid;
  gap: 10px;
}
```

Block explanation:

- Removes default bullets and padding from the list.
- Adds top spacing.
- Uses grid layout to stack items with consistent gaps.

```css
@media (max-width: 560px) {
  .task-form {
    grid-template-columns: 1fr;
  }
}
```

Block explanation:

- This is a media query for small screens.
- When the screen width is `560px` or less, the input and button stack vertically.
- This improves usability on phones.

## End-to-End Example

Suppose the user types `Finish homework` and clicks `Add`.

Browser step:

```http
POST /tasks
```

Form body conceptually becomes:

```txt
title=Finish homework
```

Server logic:

```js
const title = req.body.title?.trim();
```

This becomes:

```js
const title = "Finish homework";
```

Then this runs:

```js
tasks.unshift({
  id: nextTaskId++,
  title,
});
```

So the array becomes:

```js
[
  { id: 1, title: "Finish homework" }
]
```

Then:

```js
res.redirect("/");
```

The browser requests the home page again, and EJS renders:

```html
<li class="task-item">
  <span class="task-title">Finish homework</span>
</li>
```

## Important Concepts Summary

- Express: handles server logic and routes.
- Middleware: code that runs before route handlers, such as parsing form data.
- Route: code connected to a URL and HTTP method like `GET /` or `POST /tasks`.
- EJS: template engine for mixing HTML with server-side values.
- `req.body`: object containing submitted form data.
- `res.render()`: renders a template and sends HTML to the browser.
- `res.redirect()`: tells the browser to go to another URL.
- In-memory data: data stored in variables, lost when the app restarts.

## Current Limitation

The app does not persist data.

That means:

- restarting the server removes tasks
- tasks are not shared permanently
- there is no edit, delete, or complete feature

If you want, the next step can be adding file storage or a database.
