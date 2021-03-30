const express = require("express");

const { getCompanies } = require("./handlers/companies-handlers");

const router = express.Router();

router.get("/", getCompanies);

module.exports = router;
