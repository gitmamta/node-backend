const Product = require("../model/productModel");
exports.getDashboard = async (req, res) => {
  try {
    const products = (await Product.find()) || [];

    res.render("dashboard", {
      user: req.user,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
