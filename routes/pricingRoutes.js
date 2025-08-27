const express = require("express");
const router = express.Router();

const pricingController = require("../controllers/pricingController");

// check admin
const checkAdmin = require('../middlewares/checkAdmin');

router.get("/get", pricingController.getPricing);

router.post("/add", checkAdmin, pricingController.addPricing);


module.exports = router;
