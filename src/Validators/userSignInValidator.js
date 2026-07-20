import { body, validationResult } from "express-validator";

const signInValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required to log In.")
    .isEmail()
    .withMessage("Email is not valid.")
    .normalizeEmail(),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required to Log in.")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters long."),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Failed to Log In.",
        error: errors.array()[0].msg,
      });
    }
    next();
  },
];

export default signInValidator;
