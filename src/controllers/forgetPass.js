import nodemailer from "nodemailer";
import "dotenv/config";
import bcrypt from "bcrypt";
import User from "../models/user.js";
import { body, ExpressValidator } from "express-validator";

const senderEmail = process.env.EMAIL;

function generateOTP() {
  let digits = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let OTP = "";
  let len = digits.length;
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * len)];
  }
  return OTP;
}
function transporterFun() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: senderEmail,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
}

const sendOTP = async (req, res) => {
  const { email } = req.body;
  try {
    const userExist = await User.findOne({ email: email.toLowerCase() });
    if (!userExist)
      return res.status(200).json({
        success: true,
        message: " If email Exist The OTP is sent",
      });

    const otp = generateOTP();
    const expiresIn = Date.now() + 15 * 60 * 100;

    userExist.resetPasswordToken = otp;
    userExist.resetPasswordExpires = expiresIn;
    const tokenSet = await userExist.save();
    if (!tokenSet) {
      User.resetPasswordToken = "";
      User.resetPasswordExpires = "";
      return res.status(200).json({
        success: false,
        message: " If Email exist the OTP is sent.",
      });
    }
    let transporter = transporterFun();
    const mailOptions = {
      from: senderEmail,
      to: userExist.email,
      subject: "Reset Password OTP",
      text: `To reset your password the OTP is : ${otp}`,
    };

    let otpSent = await transporter.sendMail(mailOptions);
    if (!otpSent)
      return res.status(200).json({
        success: true,
        message: "if Email exist OTP is Sent.",
      });

    return res.status(200).json({
      success: true,
      message: ` The OTP is been sent to :${userExist.email}`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: " Failed to send OTP",
      error: error.message,
    });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { otp, email } = req.body;
    if (!otp || (otp.length < 6 && typeof otp !== "string"))
      return res.status(400).json({
        success: false,
        message: "not a valid OTP",
      });
    const userExist = await User.findOne({ email: email.toLowerCase() });
    if (!userExist)
      return res.status(400).json({
        success: false,
        message: " OTP is Not Valid or TimeOut.1",
      });

    if (userExist.resetPasswordToken !== otp)
      return res.status(400).json({
        success: false,
        message: " OTP is Not Valid or TimeOut.2",
      });

    if (userExist.resetPasswordExpires < Date.now())
      return res.status(400).json({
        success: false,
        message: " OTP is Not Valid or TimeOut.3",
      });

    return res.status(200).json({
      success: true,
      message: "OTP verified",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: " Failed to verify OTP",
      error: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { opt, email, password } = req.body;

    const userExist = await User.findOne({ email: email.toLowerCase() });
    console.log(userExist);

    if (!userExist)
      return res.status(404).json({
        success: false,
        message: "failed to reset password1",
      });
    if (userExist.resetPasswordToken !== opt)
      return res.status(404).json({
        success: false,
        message: "Failed to reset password2",
      });

    userExist.password = password.trim();
    userExist.resetPasswordExpires = undefined;
    userExist.resetPasswordToken = undefined;

    console.log(userExist);
    const userUpdated = await userExist.save();

    if (!userUpdated)
      return res.status(400).json({
        success: false,
        message: "Failed to update password1",
      });

    return res.status(200).json({
      success: true,
      message: `Password was Updated for ${userExist.email}`,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};
export { sendOTP, verifyOTP, resetPassword };
