import mongoose from "mongoose";

/*
  A schema is like a blueprint for MongoDB documents.
  It defines:
  - which fields exist
  - what type each field should have
  - which validations should run
  - how data should be cleaned before saving

  Every expense document in this project should follow these rules.
*/
const expenseSchema = new mongoose.Schema({
  name: {
    // Expense name should be text, for example "groceries" or "rent".
    type: String,

    // `required: true` means MongoDB documents should not be saved without a name.
    required: true,

    // `unique: true` asks MongoDB to keep duplicate names from being stored.
    unique: true,

    // Converts values like "FOOD" to "food" before saving.
    lowercase: true,

    // Removes unnecessary spaces from the beginning and end.
    trim: true,
  },
  amount: {
    /*
      Number is better than String here because we do calculations on expense amounts.
      If this were a string, "100" would be text, not a numeric value.
      Using Number makes totals, comparisons, and validation much easier.
    */
    type: Number,

    // Every expense must include an amount.
    required: true,

    // Prevents negative values from being saved.
    min: 0,
  },
});

/*
  A model is the tool we use to interact with the collection in MongoDB.
  Once the schema is ready, the model gives methods such as:
  - `Expense.find()`
  - `Expense.create()`
  - `Expense.findById()`
  - `Expense.findByIdAndDelete()`

  Simple mental model:
  - schema = rules
  - model = operations using those rules
*/
const Expense = mongoose.model("expense", expenseSchema);

export default Expense;
