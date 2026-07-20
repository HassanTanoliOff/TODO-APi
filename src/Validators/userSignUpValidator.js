import { body, validationResult } from "express-validator";
const phoneFormat = /^\+92\d{3}\d{7}$/;
const userSignUpValidator = [
  body("userName")
    .trim()
    .notEmpty()
    .withMessage("User Name is Required")
    .isLength({ min: 4 })
    .withMessage("User Name is too short.")
    .isLength({ max: 50 })
    .withMessage("User name can't be too long."),

  body("email")
    .notEmpty()
    .withMessage("Email is Required.")
    .isEmail()
    .withMessage("Email is not valid.")
    .normalizeEmail(),

  body("phone")
    .optional({ values: "falsy" })
    .matches(phoneFormat)
    .withMessage("The Phone number must be in format +92 123-1234567"),

  body("password")
    .notEmpty()
    .withMessage("Password is required to Signup")
    .isLength({ min: 6 })
    .withMessage("Password must be 6 character long."),

  (req, res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Failed to SignUp",
        error: validationErrors.array()[0].msg,
      });
    }

    next();
  },
];

export default userSignUpValidator;
