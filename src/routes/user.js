import express from "express";
import { signUp, signIn } from "../controllers/user.js";
import userSignUpValidator from "../validators/userSignUpValidator.js";
import userSignInValidator from "../validators/userSignInValidator.js";
const router = express.Router();

router.post("/signup", userSignUpValidator, signUp);
router.post("/signin", userSignInValidator, signIn);

export default router;
