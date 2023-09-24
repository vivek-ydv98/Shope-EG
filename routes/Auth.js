const express = require("express");
const router = express.Router();
const { createUser, loginUser, checkAuth } = require("../controller/Auth");
const passport = require("passport");

router
  .post("/signup", createUser)
  .post("/login", passport.authenticate("local"), loginUser)
  .get("/check", passport.authenticate("jwt"), checkAuth);

exports.router = router;
