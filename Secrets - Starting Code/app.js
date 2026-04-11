//jshint esversion:6

import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";

const app = express();

config();

connectDB();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(authRoutes);

app.listen(PORT, () => console.log("Server started on port : ", PORT));
