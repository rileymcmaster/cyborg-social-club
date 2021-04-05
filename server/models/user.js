const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const schema = new Schema({
  //id refering to user object created
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});
module.exports = mongoose.model("Order", schema, "users");
