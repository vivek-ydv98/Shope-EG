const express = require("express");
const router = express.Router();
const { addToCart, fetchCartByUser, updateCart, deleteFromCart} = require("../controller/Cart");

router.post("/", addToCart);
router.get("/:userId", fetchCartByUser);
router.patch("/:id", updateCart);
router.delete("/:id", deleteFromCart);

exports.router = router;
