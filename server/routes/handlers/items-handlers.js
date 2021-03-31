const items = require("../../data/items.json");

const getItems = (req, res) => {
  console.log("params", req.params);
  res.status(200).json({
    status: 200,
    data: items,
  });
};

const getItemById = (req, res) => {
  // console.log("params", req.params);

  const findItem = items.find((item) => {
    return Number(item._id) === Number(req.params.id);
  });

  if (findItem) {
    res.status(202).json({ data: findItem });
  } else {
    res.status(404).json({ msg: "not in the database" });
  }
};

module.exports = { getItems, getItemById };
