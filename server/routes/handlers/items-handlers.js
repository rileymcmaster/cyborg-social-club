const items = require("../../data/items.json");
const companies = require("../../data/companies.json");

// Reusable paginator
const paginator = (req, res, givenItems) => {
  const page = req.query.page ? parseInt(req.query.page) : 1;

  const limit = req.query.limit ? parseInt(req.query.limit) : givenItems.length;
  const lastPage = Math.ceil(givenItems.length / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  if (endIndex > givenItems.length) {
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
  // console.log(startIndex, endIndex, lastPage);
  results.results = givenItems.slice(startIndex, endIndex);
  // console.log(results);

  // console.log("params", req.params);
  res.status(200).json({
    status: 200,
    data: { results: results.results, lastPage },
  });
};

const getItems = (req, res) => {
  paginator(req, res, items);
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

const getItemsByCategory = (req, res) => {
  // console.log("params", req.params);

  const filterItems = items.filter((item) => {
    // console.log(item);

    //category
    let removeSpacesCat = item.category.toLowerCase().split(" ").join("");
    //body part
    let removeSpacesBody = item.body_location.toLowerCase().split(" ").join("");
    //MATCH THE COMPANY ID

    const givenCategory = req.params.category.toLowerCase();
    let companyIdMatch = companies.filter((company) => {
      const companyName = company.name.toLowerCase();

      if (
        givenCategory === companyName ||
        companyName.includes(givenCategory)
      ) {
        return company;
      }
    });
    if (
      removeSpacesCat === givenCategory ||
      removeSpacesBody === givenCategory
    ) {
      return item;
    } else if (
      companyIdMatch.length > 0 &&
      item.companyId === companyIdMatch[0]._id
    ) {
      return item;
    }
  });

  paginator(req, res, filterItems);

  // if (filterItems) {
  //   res.status(202).json({ data: filterItems });
  // } else {
  //   res.status(404).json({
  //     msg: "not in the database",
  //     error: "Nothing found",
  //     data: req.params.category,
  //   });
  // }
};

module.exports = { getItems, getItemById, getItemsByCategory };
