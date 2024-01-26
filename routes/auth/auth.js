const express = require("express");
const router = express.Router();
const {
  validateSignIn,
  validateSignUp,
} = require("../../middleware/authSchemaValidator");
const { signIn, signUp } = require("../../controller/auth/authController");

router.post("/signin", validateSignIn, signIn);
router.post("/signup", validateSignUp, signUp);

module.exports = router;
