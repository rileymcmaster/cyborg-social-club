const companies = require("../../data/companies.json");

const getCompanies = (req, res) => {
  res.status(200).json({
    status: 200,
    data: companies,
  });
};

const getCompanyById = (req, res) => {
  console.log("REQ1", req.body.id);
  console.log("REQ2", req.params);

  const findCompany = companies.find((company) => {
    return Number(company._id) === Number(req.params.id);
  });

  if (findCompany) {
    res.status(202).json({ data: findCompany });
  } else {
    res.status(404).json({ msg: "not in the database" });
  }
};

module.exports = { getCompanies, getCompanyById };
