const express = require("express");
const router = express.Router();

const { check } = require("express-validator");

const { signout, signup, signin, isSignedIn, errorHandler } = require("../controllers/auth");

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

router.get("/signout", isSignedIn, errorHandler ,signout);


router.get("/testroute", isSignedIn, (req, res) => {
  res.json({
    message : "a protected route!"
  })
})


module.exports = router;
