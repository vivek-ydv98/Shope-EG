const express = require("express");
const router = express.Router();
const { createProduct, fetchProducts, fetchProductById, updateProduct } = require("../controller/Product");

//products is already added in base path
router
  .post("/", createProduct)
  .get("/", fetchProducts)
  .get("/:id", fetchProductById)
  .patch("/:id", updateProduct);

exports.router = router;
