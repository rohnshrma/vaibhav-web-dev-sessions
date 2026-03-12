// Import the Express library.
// Express gives us helper methods for creating a web server,
// defining routes, reading form data, and sending responses.
import express from "express";

// Create an Express application instance.
// `app` becomes the main object we use to configure the server.
const app = express();

// Store the port number in a constant so it is easy to reuse
// and easy to change later from one place.
const PORT = 3000;

// This array stores all tasks in memory.
// Each task will be a small object like:
// { id: 1, title: "Buy milk" }
// Important concept:
// This is temporary storage, not a database.
// If the server restarts, this array resets to an empty array.
const tasks = [];

// This variable keeps track of the next unique id for a task.
// `tasks.length + 1` works as a simple starting point because the app
// begins with no tasks.
// We use `let` instead of `const` because the value changes over time.
let nextTaskId = tasks.length + 1;

// Tell Express to serve static files from the `public` folder.
// Static files are files the browser can request directly,
// such as CSS, images, or client-side JavaScript.
// Because of this line, `/style.css` can be loaded from `public/style.css`.
app.use(express.static("public"));

// Tell Express to read form data sent using the
// `application/x-www-form-urlencoded` format.
// HTML forms use this format by default.
// After this middleware runs, submitted form values become available
// inside `req.body`.
app.use(express.urlencoded({ extended: true }));

// Set EJS as the view engine.
// This means `res.render("index")` will look for `views/index.ejs`.
// EJS lets us mix HTML with JavaScript-like template syntax.
app.set("view engine", "ejs");

// Handle GET requests for the home page `/`.
// Concept:
// A GET request is typically used to fetch and display data.
app.get("/", (req, res) => {
  // Render the `index.ejs` template.
  // The second argument is an object containing data we want to pass
  // into the template.
  // Here we pass `tasks`, so the EJS file can loop through and show them.
  res.render("index", {
    tasks,
  });
});

// Handle POST requests to `/tasks`.
// Concept:
// A POST request is typically used to create or send new data.
// In this app, the form submits here when the user adds a new task.
app.post("/tasks", (req, res) => {
  // Read the value of the input named `title` from the submitted form.
  // Optional chaining `?.` prevents an error if `req.body.title`
  // is unexpectedly missing.
  // `.trim()` removes spaces from the beginning and end.
  // Example:
  // "   study   " becomes "study"
  const title = req.body.title?.trim();

  // Only create a task if there is actual text after trimming.
  // This prevents empty tasks such as "" or "     ".
  if (title) {
    // Add the new task to the beginning of the array.
    // `unshift` places the newest task at the top of the list.
    tasks.unshift({
      // Store the current id value in the task.
      id: nextTaskId++,

      // Store the task text entered by the user.
      title,
    });
  }

  // Redirect the browser back to `/` after the form is processed.
  // Concept:
  // This creates the classic form flow:
  // 1. User submits the form
  // 2. Server updates data
  // 3. Server redirects back to the page
  // 4. Browser reloads the updated task list
  //
  // Why redirect instead of rendering directly here?
  // It avoids duplicate form resubmission problems if the user refreshes.
  res.redirect("/");
});

// Start the Express server and make it listen for incoming requests
// on port 3000.
// The callback runs once the server has started successfully.
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
