const express = require("express");

const { getItems } = require("./handlers/items-handlers");

const router = express.Router();

router.get("/", getItems);

module.exports = router;
