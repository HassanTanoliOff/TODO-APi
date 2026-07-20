import mongoose from "mongoose";
import generateNewDueDate from "../utils/dateUtil.js";
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

      default: generateNewDueDate,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true },
);

const Todo = mongoose.model("todo", todoSchema);

export default Todo;
