const items = require("../../data/items.json");
const companies = require("../../data/companies.json");

const getItems = (req, res) => {
  // console.log("params", req.params);
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

const getItemsByCategory = (req, res) => {
  // console.log("params", req.params);

  const filterItems = items.filter((item) => {
    //category
    let removeSpacesCat = item.category.toLowerCase().split(" ").join("");
    //body part
    let removeSpacesBody = item.body_location.toLowerCase().split(" ").join("");
    //MATCH THE COMPANY ID
    let companyIdMatch = companies.filter((company) => {
      if (req.params.category.toLowerCase() === company.name.toLowerCase()) {
        return company;
      }
    });
    if (
      removeSpacesCat === req.params.category ||
      removeSpacesBody === req.params.category
    ) {
      return item;
    } else if (
      companyIdMatch.length > 0 &&
      item.companyId === companyIdMatch[0]._id
    ) {
      return item;
    }
  });
  // ////////////////
  ////////////
  //////////
  ////////
  if (filterItems) {
    res.status(202).json({ data: filterItems });
  } else {
    res.status(404).json({
      msg: "not in the database",
      error: "Nothing found",
      data: req.params.category,
    });
  }
};

module.exports = { getItems, getItemById, getItemsByCategory };
