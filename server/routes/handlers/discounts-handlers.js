const discounts = require("../../data/discounts.json");

const applyDiscount = (req, res) => {
  console.log(req.body);

  console.log(discounts);
  const foundCode = discounts.find(
    (discount) => discount.code === req.body.couponCode
  );
  //   console.log(foundCode.value);

  if (foundCode) {
    res.status(200).json({
      status: 200,
      value: foundCode.value,
      message: "Discount applied",
    });
  } else
    res.status(400).json({
      status: 400,
      message: "The provided discount code is not valid.",
    });
};
module.exports = {
  applyDiscount,
};
