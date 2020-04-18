const express = require("express");
const router = express.Router();

const { check } = require("express-validator");

const { signout, signup, signin } = require("../controllers/auth");

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

router.post(
  "/signin",
  [
    check("email").isEmail().withMessage("Email is not valid!"),
    check("password")
      .isLength({ min: 3 })
      .withMessage("Password field is required!"),
  ],
  signin
);





router.get("/signout", signout);
module.exports = router;
