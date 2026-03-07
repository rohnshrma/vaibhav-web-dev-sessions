# `server.js` Setup + Full Line-by-Line Explanation

This guide now covers only `server.js`.

---

## 1) Project Setup Steps (from scratch)

### Step 1: Create `server.js`

Create a new file in project root:

```bash
touch server.js
```

---

### Step 2: Initialize npm

```bash
npm init -y
```

What this does:
- Creates `package.json` with default values.
- Enables dependency and script management.

---

### Step 3: Change project to ES Module mode

In `package.json`, add:

```json
{
  "type": "module"
}
```

Why:
- Allows `import ... from ...` syntax in Node.js.
- Without this, Node expects CommonJS (`require`) by default.

---

### Step 4: Add scripts (`dev` and `start`)

In `package.json`, under `scripts`:

```json
{
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js"
  }
}
```

Why:
- `npm run dev` starts with auto-reload (nodemon).
- `npm start` runs normal production-style Node process.

---

### Step 5: Install dependencies

Requested core installs:

```bash
npm install express
npm install --save-dev nodemon
```

For your current code (because `server.js` uses `morgan` too), also install:

```bash
npm install morgan
```

---

### Step 6: Run server

Development:

```bash
npm run dev
```

Normal run:

```bash
npm start
```

---

## 2) Current `server.js` (full)

```js
import express from "express";
import morgan from "morgan";
import { cwd } from "node:process";
const app = express();

const PORT = 3000;

//
app.use(morgan("dev"));

app.use(express.static("public"));

//routes

// home (root)

app.route("/").get((req, res) => {
  res.sendFile(`${cwd()}/pages/index.html`);
});

app.route("/about").get((req, res) => {
  res.sendFile(`${cwd()}/pages/about.html`);
});

app.route("/contact").get((req, res) => {
  res.sendFile(`${cwd()}/pages/contact.html`);
});

app.use((req, res) => {
  res.status(404).sendFile(`${cwd()}/pages/404.html`);
});

app.listen(PORT, () => console.log("Server started on port : ", PORT));
```

---

## 3) Line-by-Line Explanation (each line with code snippet)

### Line 1

```js
import express from "express";
```

- Imports Express framework.
- Express handles routing, middleware, and response APIs.

### Line 2

```js
import morgan from "morgan";
```

- Imports Morgan logger middleware.
- Logs incoming HTTP requests in terminal.

### Line 3

```js
import { cwd } from "node:process";
```

- Imports `cwd()` from Node process module.
- `cwd()` returns current working directory.
- Used to build absolute paths for `sendFile`.

### Line 4

```js
const app = express();
```

- Creates Express application instance.
- `app` is the main object where middleware/routes are registered.

### Line 5

```js

```

- Blank line for readability.

### Line 6

```js
const PORT = 3000;
```

- Defines server port number.
- App will listen on `http://localhost:3000`.

### Line 7

```js

```

- Blank line for readability.

### Line 8

```js
//
```

- Comment line only.
- No runtime behavior.

### Line 9

```js
app.use(morgan("dev"));
```

- Registers Morgan middleware globally.
- `"dev"` format prints compact request logs (method, URL, status, time).
- `app.use(...)` means run for every request.

### Line 10

```js

```

- Blank line.

### Line 11

```js
app.use(express.static("public"));
```

- Serves static files from `public/` directory.
- Example: `/styles.css` maps to `public/styles.css`.
- Important for CSS/images/js assets.

### Line 12

```js

```

- Blank line.

### Line 13

```js
//routes
```

- Comment label for route section.

### Line 14

```js

```

- Blank line.

### Line 15

```js
// home (root)
```

- Comment indicating next route is root path.

### Line 16

```js

```

- Blank line.

### Line 17

```js
app.route("/").get((req, res) => {
```

- Starts GET route for `/`.
- `req` = incoming request object.
- `res` = outgoing response object.
- `app.route("/").get(...)` defines handler for HTTP GET on root.

### Line 18

```js
  res.sendFile(`${cwd()}/pages/index.html`);
```

- Sends `pages/index.html` to browser.
- Uses absolute path with `cwd()` to avoid path resolution issues.

### Line 19

```js
});
```

- Ends root route callback and route definition.

### Line 20

```js

```

- Blank line.

### Line 21

```js
app.route("/about").get((req, res) => {
```

- Starts GET route for `/about`.

### Line 22

```js
  res.sendFile(`${cwd()}/pages/about.html`);
```

- Sends `pages/about.html`.

### Line 23

```js
});
```

- Ends `/about` route block.

### Line 24

```js

```

- Blank line.

### Line 25

```js
app.route("/contact").get((req, res) => {
```

- Starts GET route for `/contact`.

### Line 26

```js
  res.sendFile(`${cwd()}/pages/contact.html`);
```

- Sends `pages/contact.html`.

### Line 27

```js
});
```

- Ends `/contact` route block.

### Line 28

```js

```

- Blank line.

### Line 29

```js
app.use((req, res) => {
```

- Catch-all middleware for unmatched routes.
- Because it is placed after known routes, it runs only when no route matched.

### Line 30

```js
  res.status(404).sendFile(`${cwd()}/pages/404.html`);
```

- Sets HTTP status to `404`.
- Sends custom 404 page (`pages/404.html`).

### Line 31

```js
});
```

- Ends catch-all middleware block.

### Line 32

```js

```

- Blank line.

### Line 33

```js
app.listen(PORT, () => console.log("Server started on port : ", PORT));
```

- Starts HTTP server on `PORT`.
- Callback runs once server is listening.
- Logs startup message in terminal.

---

## 4) Execution Order (important concept)

For any request, Express processes top-to-bottom:

1. `morgan("dev")` logs request.
2. `express.static("public")` tries to serve static file.
3. Named routes (`/`, `/about`, `/contact`) are checked.
4. If no route matches, catch-all returns `404` page.

This order is why the 404 handler must stay near the end.
