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

    // validation
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
    try {
        const { id } = req.params;
        const { previewImages, image, title, description, category, min_price, max_price } = req.body;

        // validation
        if (!title || !description || !category || !min_price || !max_price) {
            return res.status(400).json({ error: "All required fields must be filled" });
        }

        if (isNaN(min_price) || isNaN(max_price)) {
            return res.status(400).json({ error: "Prices must be numbers" });
        }

        if (Number(min_price) > Number(max_price)) {
            return res.status(400).json({ error: "Min price cannot be greater than max price" });
        }

        // main image
        let mainImageBuffer = typeof image === "string"
            ? Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""), "base64")
            : image;

        // update main product
        Product.updateProduct(id, mainImageBuffer, title, description, category, min_price, max_price, async (err, result) => {
            if (err) return res.status(500).json({ error: "Error updating product" });

            try {
                if (previewImages && previewImages.length > 0) {
                    // delete old preview images
                    Product.deletePreviewImages(id, async (err) => {
                        if (err) return res.status(500).json({ error: err.message });

                        // convert new images
                        const previewImagesBuffer = previewImages.map((img) =>
                            Buffer.from(img.replace(/^data:image\/\w+;base64,/, ""), "base64")
                        );

                        // insert all new preview images
                        const insertPromises = previewImagesBuffer.map(
                            (img) =>
                                new Promise((resolve, reject) => {
                                    Product.insertPreviewImages(id, img, (err, result) => {
                                        if (err) return reject(err);
                                        resolve(result);
                                    });
                                })
                        );

                        await Promise.all(insertPromises);  // collect all 
                    });
                }

                return res.status(200).json({ message: "Product updated", product: result });
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ error: "Unexpected error" });
    }
};


// DELETE /products/:id
exports.deleteProduct = (req, res) => {
    const { id } = req.params;

    // check previewImages or not 
    Product.getProductImages(id, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        // if previewImages exist then delete all with product
        if (result.length > 0) {
            Product.deletePreviewImages(id, (deleteError) => {
                if (deleteError) return res.status(500).json({ error: deleteError.message });

                Product.deleteProduct(id, (err) => {
                    if (err) return res.status(500).json({ error: err.message });
                    return res.status(200).json({ message: "Product and previewImages deleted" });
                });
            })

        } else {
            // delete product only
            Product.deleteProduct(id, (err) => {
                if (err) return res.status(500).json({ error: err.message });
                return res.status(200).json({ message: "Product deleted" });
            });
        }
    })


};

