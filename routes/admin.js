const path = require("path");
const express = require("express");
const router = express.Router();

//controllers
const adminController = require("../controllers/admin");

//middleware
const isAuth = require("../middleware/is-auth");

// /admin/products => GET
router.get("/products", isAuth, adminController.getAllProducts);

// /admin/add-product => GET
router.get("/add-product", isAuth, adminController.getAddProduct);

// // /admin/edit-product => GET
router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

// // /admin/edit-product => POST
router.post("/edit-product", isAuth, adminController.updateProduct);

// // /admin/delete-product => POST
router.post("/delete-product", isAuth, adminController.deleteProduct);

// /admin/add-product => POST
router.post("/add-product", isAuth, adminController.postAddProduct);

module.exports = router;
