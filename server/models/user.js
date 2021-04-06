const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isSignedIn: { type: Boolean, required: true },
});

module.exports = mongoose.model("User", schema, "users");
