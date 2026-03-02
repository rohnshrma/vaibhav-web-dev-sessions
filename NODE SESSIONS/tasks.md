# Tasks To Build The Same Node Server (Step By Step)

1. Initialize project
   - Run `npm init -y`.
   - Set `"type": "module"` in `package.json` for ES module imports.

2. Create project structure
   - Create `server.js`.
   - Create `pages/index.html`.
   - Create `pages/about.html`.

3. Add start scripts
   - In `package.json`, add:
     - `"start": "node server.js"`
     - `"dev": "nodemon server.js"` (optional for auto-reload).

4. Import required Node modules
   - `http` for server creation.
   - `fs` for file reading.
   - `cwd` from `process` for absolute file paths.

5. Create HTTP server
   - Use `http.createServer((req, res) => { ... })`.
   - Implement route checks based on `req.url`.

6. Implement home route (`/` and `/index.html`)
   - Resolve path to `pages/index.html`.
   - Use `fs.readFile(...)` to load file.
   - Return `500` on error.
   - Return `200` + HTML data on success.

7. Implement API route (`/api`)
   - Set header to `application/json`.
   - Send JSON with `JSON.stringify(...)`.
   - End response.

8. Implement about route (`/about`)
   - Resolve path to `pages/about.html`.
   - Use `fs.readFile(...)`.
   - Return `500` on error, `200` + HTML on success.

9. Implement 404 fallback
   - For unmatched routes, return `404`.
   - Send a simple custom HTML not-found page.

10. Start server
    - Call `server.listen(3000, () => console.log(...))`.

11. Test routes in browser or Postman
    - `http://localhost:3000/`
    - `http://localhost:3000/about`
    - `http://localhost:3000/api`
    - `http://localhost:3000/anything-else` (should return 404 page)

12. Verify behavior
    - Check status codes (200, 404, 500).
    - Confirm content types (`text/html`, `application/json`).
    - Confirm all responses call `res.end(...)`.
