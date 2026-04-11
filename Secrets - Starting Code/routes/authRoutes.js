import { Router } from "express";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

const router = Router();

router.route("/").get((req, res) => res.render("home"));

router
  .route("/register")
  .get((req, res) => res.render("register"))
  .post(async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ username: username });

      if (user) {
        console.log("User already exists with email : ", username);
        return res.redirect("/login");
      }

      await User.create({
        username,
        password: await bcrypt.hash(password, 10),
      });

      console.log("User Successfully Registered");
      res.render("secrets");
    } catch (err) {
      console.log("Failed to Register!");
      res.redirect("/register");
    }
  });

router
  .route("/login")
  .get((req, res) => res.render("login"))
  .post(async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ username: username });

      if (!user) {
        console.log("User doesn't exists with email : ", username);
        return res.redirect("/register");
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        console.log("Invalid Password");
        return res.redirect("/login");
      }

      console.log("User Successfully Logged In");
      res.render("secrets");
    } catch (err) {
      console.log("Failed to Login!");
      res.redirect("/register");
    }
  });

export default router;
