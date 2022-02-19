const mongoose = require("mongoose");



/*require npm install --save mongoose-unique-validator */
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

/// A PLUGIN TO ADD AN EXTRA HOOK TO CHECK YOUR DATA BEFORE SAVING TO DATABASE
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
