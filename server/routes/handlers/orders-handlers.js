const orders = require("../../data/orders.json");

const saveOrder = (req, res) => {
  console.log(req.body);
  orders.push(req.body);

  res.status(200).json({
    status: 200,
    order: req.body,
    message: "Order received",
  });
};

module.exports = {
  saveOrder,
};
