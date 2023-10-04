const express = require("express");
const router = express.Router();
const { createProduct, fetchProducts, fetchProductById, updateProduct } = require("../controller/Product");
const { Product } = require("../model/Product");

router
  .post("/", createProduct)
  .get("/", fetchProducts)
  .get("/:id", fetchProductById)
  .patch("/:id", updateProduct) 
  // .get("/update/testt", async (req, res) => {
  //   console.log("+++++");
  //   console.log("+++++++++++++++++++++++++++++++++++++++++++++++==");
  //   const products = await Product.find({});
  //   try {
  //     for (let product of products) {
  //       product.discountPrice = Math.round(
  //         product.price * (1 - product.discountPercentage / 100)
  //       );
  //       await product.save();
  //       console.log(product.discountPrice);
  //       console.log(product.title + "updated");
  //     }
  //     res.send("ok");
  //   } catch (error) {
  //     console.log(error);
  //     res.send(error);
  //   }
  // });

exports.router = router;
