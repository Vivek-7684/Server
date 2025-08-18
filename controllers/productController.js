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

exports.addProduct = (req, res) => {
    let { image, previewImages, title, description, category, min_price, max_price } = req.body;

    // server-side validation
    if (!title || !description || !category || !min_price || !max_price) {
        return res.status(400).json({ error: "All required fields must be filled" });
    }

    if (isNaN(min_price) || isNaN(max_price)) {
        return res.status(400).json({ error: "Prices must be numbers" });
    }

    if (Number(min_price) > Number(max_price)) {
        return res.status(400).json({ error: "Min price cannot be greater than max price" });
    }

    // convert main image
    const mainImageBuffer = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""), "base64");

    Product.addProduct(mainImageBuffer, title, description, category, min_price, max_price, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        const productId = result.insertId;

        //insert preview Images
        if (previewImages && previewImages.length > 0) {
            previewImages.forEach(base64Img => {
                const imgBuffer = Buffer.from(base64Img.replace(/^data:image\/\w+;base64,/, ""), "base64");
                Product.addPreviewImage(productId, imgBuffer, (err2) => {
                    if (err2) console.error("Preview insert error:", err2);
                });
            });
        }

        return res.status(201).json({ message: "Product added successfully", productId });
    });
};

// PUT /products/:id
exports.updateProduct = (req, res) => {

    const { id } = req.params;
    const { image, previewImages, title, description, category, min_price, max_price } = req.body;

    // server-side validation
    if (!title || !description || !category || !min_price || !max_price) {
        return res.status(400).json({ error: "All required fields must be filled" });
    }

    if (isNaN(min_price) || isNaN(max_price)) {
        return res.status(400).json({ error: "Prices must be numbers" });
    }

    if (Number(min_price) > Number(max_price)) {
        return res.status(400).json({ error: "Min price cannot be greater than max price" });
    }

    let mainImageBuffer = null;
    
    if (image) {
        mainImageBuffer = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""), "base64");
    }

    Product.updateProduct(id, mainImageBuffer, title, description, category, min_price, max_price, (err, result) => {

        if (err) return res.status(500).json({ error: err.message });

        return res.status(200).json({ message: "Product updated", product: result });
    });

};


// DELETE /products/:id
exports.deleteProduct = (req, res) => {
    const { id } = req.params;

    Product.deleteProduct(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.status(200).json({ message: "Product deleted" });
    });
};

