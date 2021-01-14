const path = require("path");
const express = require("express");
const router = express.Router();

//controllers
const authController = require("../controllers/auth");

router.get("/signup", authController.getSignup);

router.get("/reset-password", authController.getResetPassword);

router.post("/reset-password", authController.postResetPassword);

router.post("/signup", authController.postSignup);

router.get("/login", authController.getLogin);

router.post("/login", authController.postLogin);

router.post("/logout", authController.postLogout);

module.exports = router;
