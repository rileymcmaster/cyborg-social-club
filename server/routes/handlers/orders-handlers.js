const orders = require("../../data/orders.json");
const Order = require("../../models/order");

const saveOrder = (req, res) => {
  console.log(req.body);
  orders.push(req.body);

  const order = new Order({
    user: "me",
    cart: "cart",
    address: "address",
    name: "name",
    paymentId: "paymentId",
  });
  order.save();

  res.status(200).json({
    status: 200,
    order: req.body,
    message: "Order received",
  });
};

module.exports = {
  saveOrder,
};
