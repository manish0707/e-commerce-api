const express = require("express");
const router = express.Router();

const {
  getCategoryById,
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  removeCategory
} = require("../controllers/category");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

// PARAMS
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

// ROUTES
router.post(
  "/category/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);
router.get("/category/:categoryId", getCategory);
router.get("/category/all", getAllCategories);

router.put(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCategory
);

router.delete(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeCategory
);


module.exports = router;
