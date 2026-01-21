const Product = require("../model/productModel");

exports.dashboard = async (req, res) => {
    try {
        console.log("req.user", req.user);

        // Fetch all products from MongoDB
        const products = await Product.find();

        // Pass products to EJS
        res.render("home", {
            role: "User",
            user: req.user,
            products   // <--- this is essential
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};
