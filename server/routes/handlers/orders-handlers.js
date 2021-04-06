const orders = require("../../data/orders.json");
const Order = require("../../models/order");
const User = require("../../models/user");

const saveOrder = (req, res) => {
  console.log(req.body);
  orders.push(req.body);
  const foundUser = User.findOne({ email: req.body.email });

  if (foundUser) {
    const order = new Order({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      shippingAddress: req.body.shippingAddress,
      total: req.body.order.total,
      cart: req.body.order.items.cart,
    });
    order.save();
  }
  if (!foundUser) {
    const order = new Order({
      firstName: req.body.customer.firstName,
      lastName: req.body.customer.lastName,
      phone: req.body.customer.phone,
      address: req.body.customer.shippingAddress,
      total: req.body.order.total,
      cart: req.body.order.items.cart,
    });
    order.save();
  }

  res.status(200).json({
    status: 200,
    order: req.body,
    message: "Order received",
  });
};

module.exports = {
  saveOrder,
};
