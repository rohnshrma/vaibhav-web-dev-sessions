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
