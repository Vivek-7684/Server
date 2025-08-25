const pricingModel = require('../model/pricingModal');


// add price 

exports.addPricing = (req, res) => {
    const { charges, discount } = req.body;

    pricingModel.addPricing(charges, discount, (err) => {
        if (err) res.status(500).json({ error: "Server Error" });
        res.status(200).json({ message: "Pricing Added" });
    })
}

// edit price 

exports.editPricing = (req, res) => {
    const { charges, discount } = req.body;

    pricingModel.editPricing(charges, discount, (err) => {
        if (err) res.status(500).json({ error: "Server Error" });
        res.status(200).json({ message: "Pricing Edited" });
    })
}