const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const schema = new Schema({
  //id refering to user object created
  user: { type: Schema.Types.ObjectId, ref: "User" },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  shippingAddress: { type: Object, required: true },
  total: { type: Number, required: true },
  cart: { type: Object, required: true },
});

module.exports = mongoose.model("Order", schema);
