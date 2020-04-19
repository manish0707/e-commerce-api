const express = require('express');
const router = express.Router();

const { getProductById, createProduct, getProduct } = require("../controllers/product")
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth")
const { getUserById } = require("../controllers//user")

// Param Route
router.param("productId", getProductById)
router.param("userId", getUserById)

// Actual Route

router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct)
router.post("/product/:productId", getProduct)


module.exports = router;