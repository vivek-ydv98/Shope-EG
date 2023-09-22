const express = require("express");
const { updateUser, fetchUserById } = require("../controller/User");

const router = express.Router();

router.get("/:id", fetchUserById)
router.patch("/:id", updateUser);

exports.router = router;
