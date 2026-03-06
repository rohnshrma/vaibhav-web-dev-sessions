# `server.js` Step-By-Step Explanation

Use this to explain how your Node server works from top to bottom.

1. Import modules
   - `import http from "http";`
   - `import { cwd } from "process";`
   - `import fs from "fs";`
   - Why:
     - `http` is used to create the server.
     - `fs` is used to read HTML files.
     - `cwd()` gives the current project path so file paths are absolute.

2. Create the server
   - `const server = http.createServer((req, res) => { ... })`
   - This callback runs on every request.
   - `req` tells what client asked for (`req.url`).
   - `res` is used to send output back.

3. Route handling starts
   - Server checks `req.url` in order using `if` blocks.
   - First match executes, then `return` stops the rest.

4. Home route (`/` or `/index.html`)
   - Build file path:
     - ``const filePath = `${cwd()}/pages/index.html`;``
   - Read file with `fs.readFile(filePath, (err, data) => { ... })`.
   - If error:
     - `res.writeHead(500, { "content-type": "text/plain" })`
     - `res.end("Sorry, Something went wrong")`
   - If success:
     - `res.writeHead(200, { "content-type": "text/html" })`
     - `res.end(data)`

5. API route (`/api`)
   - Set JSON header:
     - `res.writeHead(200, { "content-type": "application/json" })`
   - Send JSON response:
     - `res.write(JSON.stringify({ message: "API IS RUNNING", status: 200 }))`
   - End response:
     - `res.end()`

6. About route (`/about`)
   - Build path:
     - ``const filePath = `${cwd()}/pages/about.html`;``
   - Read with `fs.readFile(...)`
   - Error and success handling is same pattern as home route.

7. Fallback route (404)
   - If no route matches, fallback runs.
   - Send:
     - `res.writeHead(404, { "content-type": "text/html" })`
     - `res.end(...)` with custom "not found" HTML page.

8. Start listening
   - `server.listen(3000, () => { console.log("server running on port : 3000"); })`
   - Meaning:
     - Server is now active on port `3000`.
     - Terminal prints the startup message.

9. What output you get for each URL
   - `/` -> `index.html` page (`200`)
   - `/index.html` -> `index.html` page (`200`)
   - `/about` -> `about.html` page (`200`)
   - `/api` -> JSON output (`200`)
   - any other path -> custom 404 HTML page (`404`)

10. Quick note: `http` vs `https`
   - Your current code uses `http`, not `https`.
   - `https` needs SSL certificate files (`key` and `cert`) and different server setup.
   - For local learning, `http` is correct and simpler.
