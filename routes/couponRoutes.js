const express = require("express");

const router = express.Router();

const couponcontroller = require("../controllers/couponController");

// check admin
const checkAdmin = require('../middlewares/checkAdmin');

// route to get coupon
router.get("/getCoupon", couponcontroller.getCoupon);

// route to add coupon 
router.post("/addCoupon", checkAdmin, couponcontroller.addCoupon);

// route to add coupon 
router.put("/editCoupon/:id", checkAdmin, couponcontroller.editCoupon);

// delete coupon
router.delete("/deleteCoupon/:id", checkAdmin, couponcontroller.deleteCoupon);

module.exports = router;
