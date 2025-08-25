const express = require("express");
const router = express.Router();

const pricingController = require("../controllers/pricingController");

// check admin
const checkAdmin = require('../middlewares/checkAdmin');

router.post("/add", checkAdmin, pricingController.addPricing);

router.put("/edit", checkAdmin, pricingController.editPricing);

module.exports = router;
