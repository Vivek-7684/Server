const Product = require('../model/productModel');

exports.getAllProduct = (req, res) => {
    Product.getAllProduct((err, result) => {
        try {
            if (err) return res.status(500).send({ message: "Database Error" });
            return res.status(200).send(result);
        }
        catch (err) {
            return res.status(500).json({ Error: "Something Went Wrong" });
        }
    })
}


exports.getSingleProduct = (req, res) => {
    const { id } = req.query;
    Product.getSingleProduct(id, (err, result) => {
        try {
            if (err) return res.status(500).send({ message: "Database Error" });
            return res.status(200).send(result);
        }
        catch (err) {
            return res.status(500).json({ Error: "Something Went Wrong" });
        }
    })
}

exports.getProductImages = (req, res) => {
    Product.getProductImages(req.query.id, (err, result) => {
        try {
            if (err) res.status(500).send(err.message);
            return res.status(200).send(result);
        }
        catch (err) {
            return res.status(500).json({ Error: "Something Went Wrong" });
        }
    })
}
