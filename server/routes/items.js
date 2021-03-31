const express = require("express");

const {
  getItems,
  getItemById,
  getItemsByCategory,
} = require("./handlers/items-handlers");

const router = express.Router();

router.get("/", getItems);

router.get("/item/:id", getItemById);

router.get("/category/:category", getItemsByCategory);

module.exports = router;
