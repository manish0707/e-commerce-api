const express = require('express');
const router = express.Router();

const { getProductById, createProduct, getProduct, updateProduct, deleteProduct } = require("../controllers/product")
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth")
const { getUserById } = require("../controllers//user")

// Param Route
router.param("productId", getProductById)
router.param("userId", getUserById)

// Actual Route
router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct)
router.get("/product/:productId", getProduct)

// delte route

router.delete("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, deleteProduct)

// update route
router.put("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, updateProduct)

module.exports = router;