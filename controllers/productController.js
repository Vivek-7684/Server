const Product = require('../model/productModel');

exports.getAllProduct = (req, res) => {
    Product.getAllProduct((err, result) => {
        try {
            if (err) return res.status(500).send({ message: "Database Error" });
            return res.status(200).send(result);
        }
        catch (err) {
            return res.status(500).send(err);
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
            return res.status(500).send(err);
        }
    })
}

exports.getProductImages = (req, res) => {
    Product.getProductImages(req.query.id, (err, result) => {
        try {
            if (err) console.log(err);
            return res.status(200).send(result);
        }
        catch (err) {
            return res.status(500).send(err);
        }
    })
}
