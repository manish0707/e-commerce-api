const express = require("express");
const router = express.Router();
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const {
  getUserById,
  pushOrderInPurchaseArray,
} = require("../controllers/user");
const { updateProduct } = require("../controllers/product");

const {
  getOrderById,
  createOrder,
  getAllOrders,
  updateStatus,
  getOrderStaus,
} = require("../controllers/order");

// params
router.param("userId", getUserById);
router.param("orderId", getOrderById);

//read
router.post(
  "/order/create/userId",
  isSignedIn,
  isAuthenticated,
  pushOrderInPurchaseArray,
  updateProduct,
  createOrder
);

//READ
router.get(
  "/order/all/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllOrders
);

// status of order

router.get("/order/status/:userId", isSignedIn, isAuthenticated, isAdmin, getOrderStaus)
router.put("/order/:orderId/status/:userId", isSignedIn, isAuthenticated, isAdmin, updateStatus)

//actual routes
module.exports = router;
