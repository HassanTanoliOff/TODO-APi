import express from "express";
import { signUp, signIn } from "../controllers/user.js";
import userSignUpValidator from "../validators/userSignUpValidator.js";
import userSignInValidator from "../validators/userSignInValidator.js";
import {sendOTP,verifyOTP,resetPassword} from '../controllers/forgetPass.js'
const router = express.Router();

router.post("/signup", userSignUpValidator, signUp);
router.post("/signin", userSignInValidator, signIn);
router.post("/forgetPassword",sendOTP)
router.post("/sendOTP",verifyOTP)
router.post('/resetPass',resetPassword)
export default router;
