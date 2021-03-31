const express = require("express");

const { getItems, getItemById } = require("./handlers/items-handlers");

const router = express.Router();

router.get("/", getItems);

router.get("/item/:id", getItemById);

module.exports = router;
