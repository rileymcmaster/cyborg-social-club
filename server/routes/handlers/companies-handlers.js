const companies = require("../../data/companies.json");

const getCompanies = (req, res) => {
  res.status(200).json({
    status: 200,
    data: companies,
  });
};

module.exports = { getCompanies };
