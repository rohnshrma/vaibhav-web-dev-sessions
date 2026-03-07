import express from "express";
const app = express();

const PORT = 3000;

//routes

// home (root)

app.route("/").get((req, res) => {
  res.write("homepage");
  res.send();
});
app.route("/about").get((req, res) => {
  res.write("<h1>About Page</h1>");
  res.write("<p>This is our About Page</p>");
  res.send();
});

app.listen(PORT, () => console.log("Server started on port : ", PORT));
