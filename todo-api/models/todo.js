const mongoose = require("mongoose");
const {generateNewDueDate } = require('../utils/dateUtil')
const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 100,
      trim: true,
    },
    description: {
      type: String,
      maxLength: 500,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    dueDate: {
      type: Date,
      ////by default due date is 7 days from todo creation
      default: generateNewDueDate()
    },
  },
  { timestamps: true },
);

const Todo = mongoose.model("todo", todoSchema);

module.exports = Todo;
