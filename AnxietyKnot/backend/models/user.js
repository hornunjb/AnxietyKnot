const mongoose = require("mongoose");



/*require npm install --save mongoose-unique-validator */
const uniqueValidator = require("mongoose-unique-validator");


/// CREATE USER WILL STILL WORK EVEN WITHOUT AN ASSIGNED MONGODB USERNAME FIELD IN SCHEMA
const userSchema = mongoose.Schema({
  username: { type: String, required: false, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

/// A PLUGIN TO ADD AN EXTRA HOOK TO CHECK YOUR DATA BEFORE SAVING TO DATABASE
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
