const couponModal = require('../model/couponModel');

// get coupon

exports.getCoupon = (req, res) => {
    try {
        couponModal.getCoupon((err, result) => {

            if (err) return res.status(500).send({ message: "Server error" });

            if (result.length > 0) {
                return res.status(200).json({ message: "Get Coupon data", result: result });
            } else {
                res.status(404).json({ message: "Data not found.Please Add Coupon" });
            }

        })

    } catch (err) {
        res.status(500).send({ message: "Server Error" });
    }
}


// add coupon

exports.addCoupon = (req, res) => {
    try {
        const { couponName, minPrice, offer } = req.body;

        // validation
        if (!couponName || !minPrice || !offer) {
            const err = new Error("All fields are required!");
            err.statusCode = 400;
            throw err;
        }
        else if (isNaN(offer)) {
            const err = new Error("Discount Offer must be a number.");
            err.statusCode = 400;
            throw err;
        }
        else if (isNaN(minPrice)) {
            const err = new Error("Minimum Price must be a number.");
            err.statusCode = 400;
            throw err;
        }
        else if (!(Number(offer) >= 1 && Number(offer) <= 100)) {
            const err = new Error("Discount Offer % must be between 1 and 100.");
            err.statusCode = 400;
            throw err;
        }
        else if (Number(minPrice) < 500) {
            const err = new Error("At least 500 Minimum Price for Coupon Validity.");
            err.statusCode = 400;
            throw err;
        }

        // insert coupon
        couponModal.addCoupon(couponName, minPrice, offer, (err) => {
            if (err) return res.status(500).json({ message: "Server Error" });

            return res.status(200).json({ message: `${couponName} is Added!!`, status: 200 });
        })

    } catch (err) {
        return res.status(err.statusCode || 500).json({ message: err.message || "Server Error" });
    }
}

// edit coupon 

exports.editCoupon = (req, res) => {
    try {
        const { couponName, minPrice, offer } = req.body;

        const { id } = req.params;

        // validation
        if (!couponName || !minPrice || !offer) {
            const err = new Error("All fields are required!");
            err.statusCode = 400;
            throw err;
        }
        else if (isNaN(offer)) {
            const err = new Error("Discount Offer must be a number.");
            err.statusCode = 400;
            throw err;
        }
        else if (isNaN(minPrice)) {
            const err = new Error("Minimum Price must be a number.");
            err.statusCode = 400;
            throw err;
        }
        else if (!(Number(offer) >= 1 && Number(offer) <= 100)) {
            const err = new Error("Discount Offer % must be between 1 and 100.");
            err.statusCode = 400;
            throw err;
        }
        else if (Number(minPrice) < 500) {
            const err = new Error("At least 500 Minimum Price for Coupon Validity.");
            err.statusCode = 400;
            throw err;
        }

        // update coupon
        couponModal.updateCoupon(couponName, minPrice, offer, Number(id), (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Server Error" });
            }
            if (!result) {
                return res.status(404).json({ message: "Coupon not found!" });
            }
            return res.status(200).json({ message: `${couponName} is Updated!!` });
        });

    } catch (err) {
        return res.status(err.statusCode || 500).json({ message: err.message || "Server Error" });
    }
};

// delete coupon 
exports.deleteCoupon = (req, res) => {
    
    try {
        const id = req.params.id;
       
        couponModal.checkCoupon(Number(id), (error, result) => {
           
            if (error) return res.status(500).json({ message: error.stack });

            if (result.length > 0) {
                
                couponModal.deleteCoupon(Number(id), (err) => {
                     
                    if (err) return res.status(500).json({ message: err.stack });

                    return res.status(200).json({ message: "Coupon deleted!!", status: 200 });
                })
            } else {
                return res.status(404).json({ message: "Coupon Not Found!!", status: 404 });
            }
        })

    } catch (err) {
        return res.status(500).json({ message: err.stack });
    }

}