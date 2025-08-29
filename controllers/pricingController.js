const pricingModel = require('../model/pricingModal');

// get price 

exports.getPricing = (req, res) => {
    try {
        pricingModel.getPricing((err, result) => {

            if (err) return res.status(500).send({ message: "server error" });

            if (result.length > 0) {
                return res.status(200).json({ message: "get pricing data", result: result });
            } else {
                res.status(404).json({ message: "Data not found.Please Add Pricing" });
            }

        })

    } catch (err) {
        res.status(500).send({ message:"Server Error" });
    }

}


// add price 
exports.addPricing = (req, res) => {
    const { charges, discount } = req.body;

    try {

        // if discount,check 
        if (req.body?.discount) {
            if (isNaN(discount)) {
                throw new Error("discount must be number.");
            }
            // range check
            else if (!(discount >= 0 && discount <= 100)) {
                throw new Error("discount range must be 1 to 100.");
            }
        }

        // required
        if (!charges) {
            throw new Error("Shipping Charges is required.");
        }

        // number after conversion
        else if (isNaN(charges)) {
            throw new Error("Shipping Charges must be number.");
        }

        // charges range
        else if (!((charges) >= 1 && (charges) <= 100)) {
            throw new Error("Charges range must be 1 to 100.");
        }

        else {
            // check shipping charges
            pricingModel.getPricing((err, result) => {

                if (err) res.status(500).json({ message: "Server Error" });

                // if exist then update
                else if (result.length > 0) {
                    //if no discount then 0
                    pricingModel.editPricing(charges, discount || 0, (err) => {
                        if (err) res.status(500).json({ message: err.message });
                        res.status(200).json({ message: "Pricing Updated" });
                    })
                }

                //  else add charges and discount
                else {
                    pricingModel.addPricing(charges, discount || 0, (err) => {
                        if (err) res.status(500).json({ message: err.message });
                        res.status(200).json({ message: "Pricing Added" });
                    })
                }
            })

        }

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

}

