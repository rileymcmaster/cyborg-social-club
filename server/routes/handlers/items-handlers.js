const items = require("../../data/items.json");

const getItems = (req, res) => {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit) : items.length;
  const lastPage = Math.ceil(items.length / limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  if (endIndex > items.length) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }
  console.log(startIndex, endIndex, lastPage);
  results.results = items.slice(startIndex, endIndex);
  // console.log(results);

  res.status(200).json({
    status: 200,
    data: { results: results.results, lastPage },
  });
};

// const getItems = (req, res) => {
//   res.status(200).json({
//     status: 200,
//     data: items,
//   });
// };

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
