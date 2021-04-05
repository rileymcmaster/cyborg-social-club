const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const schema = new Schema({
  //id refering to user object created
  user: { type: String },
  cart: { type: Object, required: true },
  address: { type: String, required: true },
  name: { type: String, required: true },
  paymentId: { type: String, required: true },
});
module.exports = mongoose.model("Order", schema, "orders");
