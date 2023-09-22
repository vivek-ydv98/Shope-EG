const express = require("express");
const router = express.Router();
const { fetchOrderByUser, createOrder, updateOrder, deleteOrder, fetchAllOrders} = require("../controller/Order");

router.get("/:id", fetchOrderByUser);
router.get("/", fetchAllOrders);
router.post("/", createOrder);
router.patch("/:id", updateOrder);
router.delete("/:id", deleteOrder);

exports.router = router;
