const items = require("../../data/items.json");

const getItems = (req, res) => {
  res.status(200).json({
    status: 200,
    data: items,
  });
};
module.exports = { getItems };
