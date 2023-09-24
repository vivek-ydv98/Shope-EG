const express = require("express");
const router = express.Router();
const { fetchOrderByUser, createOrder, updateOrder, deleteOrder, fetchAllOrders} = require("../controller/Order");

router
  .get("/own", fetchOrderByUser)
  .get("/", fetchAllOrders)
  .post("/", createOrder)
  .patch("/:id", updateOrder)
  .delete("/:id", deleteOrder);

exports.router = router;
