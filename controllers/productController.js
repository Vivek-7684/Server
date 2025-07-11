const Product = require('../model/productModel');

exports.getAllProduct = (req, res) => {
    Product.getAllProduct((err, result) => {
        try {

            // console.log(result);
            return res.status(200).send(result);
        }
        catch (err) {
            return res.status(500).send(err);
        }
    })
}