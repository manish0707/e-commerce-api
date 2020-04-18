const express = require("express");
const router = express.Router();

const { check } = require("express-validator");

const { signout, signup } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("Name should be atleast three character!"),
    check("email").isEmail().withMessage("Email is not valid!"),
    check("password")
      .isLength({ min: 3 })
      .withMessage("Password is too small...!!"),
  ],
  signup
);
router.get("/signout", signout);

module.exports = router;
