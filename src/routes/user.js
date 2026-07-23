import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import fs from "fs";
import { signUp, signIn } from "../controllers/user.js";
import userSignUpValidator from "../validators/userSignUpValidator.js";
import userSignInValidator from "../validators/userSignInValidator.js";
import {
  sendOTP,
  verifyOTP,
  resetPassword,
} from "../controllers/forgetPass.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadPath = path.join(__dirname, "../uploads/profile");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  }, 
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-pi${file.fieldname}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png")
    cb(null, true);
  else cb(new Error("Only JPEG or PNG images are allowed"));
};

const upload = multer({ storage: storage, fileFilter });

router.post(
  "/signup",
  upload.single("profilePic"),
  userSignUpValidator,
  signUp,
);
router.post("/signin", userSignInValidator, signIn);
router.post("/forgetPassword", sendOTP);
router.post("/sendOTP", verifyOTP);
router.post("/resetPass", resetPassword);

export default router;
