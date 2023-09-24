const express = require("express");
const router = express.Router();
const {addToCart,fetchCartByUser,updateCart,deleteFromCart} = require("../controller/Cart");

router
  .post("/", addToCart)
  .get("/", fetchCartByUser)
  .patch("/:id", updateCart)
  .delete("/:id", deleteFromCart);

exports.router = router;
