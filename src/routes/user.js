const express = require("express");
const router = express.Router();
const { signUp, signIn } = require("../controllers/user");
const userSignUpValidator = require("../validators/userSignUpValidator");
const userSignInValidator = require("../validators/userSignInValidator");

router.post("/signup", userSignUpValidator, signUp);
router.post("/signin", userSignInValidator, signIn);

module.exports = router;
