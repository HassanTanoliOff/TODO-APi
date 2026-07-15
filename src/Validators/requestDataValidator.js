const { body, validationResult } = require("express-validator");
const { getLocalDate, getValidDueDate } = require("../utils/getLocalDate");

const allowedPriority = ["low", "medium", "high", "Low", "Medium", "High"];
const dateFormatRegex = /^(0?[1-9]|[12][0-9]|3[01])-(0?[1-9]|1[0-2])-\d{4}$/;
const minSetHours = 6;

exports.requestDataValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Task Title is Required.")
    .isLength({ min: 6, max: 100 })
    .withMessage("Title must be 6 to 100 characters long."),
  body("description")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 300 })
    .withMessage("Description can be no longer the 300 character."),
  body("completed")
    .optional({ values: "falsy" })
    .default(false)
    .isBoolean()
    .withMessage("Todo must be Completed or inComplete."),
  body("priority")
    .optional({ values: "falsy" })
    .default("medium")
    .isIn(allowedPriority)
    .withMessage(
      "Priority must be set to low | medium | high : by default it's set to medium. ",
    ),
  body("dueDate")
    .optional({ values: "falsy" })
    .default(getLocalDate)
    .matches(dateFormatRegex)
    .withMessage("Date format must be: 31-12-2026 | DD-MM-YYYY")
    .custom((value) => {
      const [day, month, year] = value.split("-").map(Number);
      const inputDate = new Date(year, month - 1, day, 0, 0, 0);
      if (
        inputDate.getFullYear() !== year ||
        inputDate.getMonth() !== month - 1 ||
        inputDate.getDate() !== day
      ) {
        throw new Error("This date can't exists enter a real date.");
      }

      const minAllowedDate = getValidDueDate();
      minAllowedDate.setHours(minAllowedDate.getHours() + minSetHours);

      if (inputDate < minAllowedDate) {
        throw new Error("Input date must be at least 6 Hours in the future");
      }
      return true;
    })
    .customSanitizer((value) => {
      if (!value) return value;
      const [day, month, year] = value.split("-").map(Number);
      return new Date(Date.UTC(year, month - 1, day));
    }),
  (req, res, next) => {
    console.log(req.body);
    const validationErrors = validationResult(req);
    console.log(validationErrors);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Failed to add Todo.",
        error: validationErrors.array()[0].msg,
      });
    }
    next();
  },
];
