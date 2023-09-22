const express = require("express");
const { addToCart, fetchCartByUser, updateCart, deleteFromCart } = require("../controller/Cart");
const router = express.Router();

router.post("/", addToCart);
router.get("/:userId", fetchCartByUser);
router.patch("/:id", updateCart);
router.delete("/:id", deleteFromCart);

exports.router = router;
