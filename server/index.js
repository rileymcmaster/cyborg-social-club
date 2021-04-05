//should we use strict?
"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { getItemById } = require("../server/routes/handlers/items-handlers");
const {
  getUserById,
  updateUserCart,
} = require("../server/routes/handlers/users-handler");
const itemsRouter = require("./routes/items");
const companiesRouter = require("./routes/companies");
const stripe = require("stripe")(process.env.STRIPE_KEY);
require("dotenv").config();

const PORT = 4000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))
  .use("/items", itemsRouter)
  .use("/companies", companiesRouter)
  .get("/item/:id", getItemById)

  ////// Sign in //////
  .post("/user", getUserById)
  .post("/updateusercart", updateUserCart)

  // send a payment to STRIPE API
  .post("/payment", async (req, res) => {
    let { amount, id, billingDetails } = req.body;
    try {
      const customer = await stripe.customers.create({
        name: billingDetails.name,
        email: billingDetails.email,
        phone: billingDetails.phone,
      });
      console.log("Customer", customer);

      const payment = await stripe.paymentIntents.create({
        amount,
        currency: "CAD",
        description: "Order 78393",
        payment_method: id,
        confirm: true,
        customer: customer.id,
      });
      console.log("Payment", payment);

      res.json({
        message: "Payment successful",
        success: true,
      });
    } catch (error) {
      console.log("Error", error);
      res.json({ message: "Payment failed", success: false });
    }
  })

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
