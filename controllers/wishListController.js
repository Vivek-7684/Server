const wishlistModel = require("../model/wishListModel");
const userModel = require("../model/userModel");

// get User's Product in WishList
exports.getProductsInWishList = (req, res) => {
    try {
        userModel.getUsernameByEmail(req.Email, (err, result) => {
            if (err) return res.status(500).send(err.message);
            if (result.length === 0) return res.status(404).send({ message: "User not found" });

            wishlistModel.getProductsInWishList(result[0].id, (err, result) => {
                if (err) return res.status(500).send({ message: "Database Error" });
                if (result.length === 0) return res.status(404).send({ message: "Your wishlist is empty for now. Explore products and add the ones you love." });

                return res.status(200).send(result);
            })

        })
    }
    catch (err) {
        return res.status(500).send({ message: "Something Went Wrong" });
    }
};

// add product in wishList 

exports.addProductsInWishList = (req, res) => {
    try {
        userModel.getUsernameByEmail(req.Email, (err, result) => {
            const { productId } = req.body;

            if (err) return res.status(500).send(err.message);
            if (result.length === 0) return res.status(404).send({ message: "User not found" });

            const UserId = result[0].id;

            wishlistModel.checkProductInWishList(UserId, productId, (err, result) => {
                if (err) return res.status(500).send({ message: "Database Error" });
                if (result.length > 0) {
                    wishlistModel.deleteProductFromWishList(UserId, productId, (err, result) => {
                        if (err) return res.status(500).send({ message: "Database Error" });
                        return res.status(200).send({ message: "The item is now removed from your wishlist. Keep browsing for more favorites!" });
                    })
                } else {
                    wishlistModel.insertProductToWishList(UserId, productId, (err, result) => {
                        if (err) return res.status(500).send({ message: "Database Error" });

                        return res.status(200).send({ message: "The product is saved in your wishlist for later." });
                    })

                }
            })


        })
    }
    catch (err) {
        return res.status(500).send({ message: "Something Went Wrong" });
    }
};  