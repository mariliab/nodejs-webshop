const path = require("path");
const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shop");
const isAuth = require("../middleware/is-auth");

router.get("/", shopController.getStartPage);

router.get("/products", shopController.getAllProducts);

router.get("/products/:productId", shopController.getProduct);

router.get("/orders", isAuth, shopController.getOrders);

router.get("/cart", isAuth, shopController.getCart);

router.post("/add-to-cart", isAuth, shopController.postToCart);

router.post("/delete-from-cart", isAuth, shopController.deleteFromCart);

router.post("/checkout", isAuth, shopController.createOrder);

module.exports = router;
