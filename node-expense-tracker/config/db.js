import mongoose from "mongoose";

/*
  This file keeps database connection logic separate from `server.js`.
  That separation is useful because:
  - the main server file stays cleaner
  - DB code has one clear responsibility
  - the connection code can be reused in bigger projects
*/
const connectDB = async () => {
  try {
    /*
      `mongoose.connect(...)` opens a connection between our app and MongoDB.

      Why `await`?
      - connecting to a database takes time
      - Mongoose returns a promise
      - we wait until the connection is either successful or throws an error

      `process.env.MONGO_URI` should contain the MongoDB connection string.
    */
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // `conn.connection.host` shows which MongoDB host we connected to.
    console.log("DB CONNECTED TO :", conn.connection.host);
  } catch (err) {
    // If connection fails, the error is logged so we know what went wrong.
    console.log(err);

    /*
      `process.exit(1)` stops the Node.js process with a failure code.
      We do this because the app depends on the database for core features.
      Running without MongoDB would leave the app in a broken state.
    */
    process.exit(1);
  }
};

export default connectDB;
