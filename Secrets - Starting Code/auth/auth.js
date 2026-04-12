import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

passport.use(
  new LocalStrategy(async (username, password, cb) => {
    const user = await User.findOne({ username: username });
    if (!user) {
      return cb(null, false, { messsage: "User not found" });
    }
    try {
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return cb(null, false, { message: "Password is incorrect" });
      }

      return cb(null, user, { message: "Correct username and password" });
    } catch (err) {
      return cb(err);
    }
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  const user = await User.findById(id);
  cb(null, user);
});

export default passport;
