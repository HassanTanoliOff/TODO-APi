const { default: mongoose, isValidObjectId } = require("mongoose");
const Todo = require("../models/todo");
const { body, param, validationResult } = require("express-validator");
mongoose.set('updatePipeline', true)
async function getTodos(req, res) {
  const userId = req.user.id;
  const allTodos = await Todo.find({ createdBy: userId });
  if (allTodos.length === 0)
    return res.status(200).json("No Todos created yet.");
  return res.status(200).json(allTodos);
}
async function getTodoById(req, res) {
  const todoId = req.params.id;
  const userId = req.user.id;

  if (!mongoose.isValidObjectId(todoId))
    return res.status(400).json({ success: false, message: "Invalid  Id" });
  try {
    const foundTodo = await Todo.findOne({ _id: todoId, createdBy: userId });
    if (!foundTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo Not found",
      });
    }
    return res
      .status(200)
      .json({ success: true, message: "Found Todo", data: foundTodo });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
}

async function addTodo(req, res) {
  const { title, description, completed, priority, dueDate } = req.body;

  const userId = req.user.id;

  const newTodo = {
    title,
    description,
    completed,
    priority,
    dueDate,
    createdBy: userId,
  };
  console.log("Before adding new todo:", newTodo);
  try {
    const result = await Todo.create(newTodo);
    return res.status(200).json({
      success: true,
      message: "Successfully added new Todo",
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to add Todo",
      error: err.message,
      data: newTodo,
    });
  }
}

async function updateTodo(req, res) {
  try {
    const validations = [
      param("id")
        .trim()
        .notEmpty()
        .withMessage("Todo Id is required")
        .custom((value) => {
          if (!mongoose.isValidObjectId(value)) {
            throw new Error("invalid id");
          }
          return true;
        })
        .withMessage("In Valid Id"),
    ];

    for (let validation of validations) {
      await validation.run(req);
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
      });
    }

    const todoId = req.params.id;
    const userId = req.user.id;

    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: todoId, createdBy: userId },
      [{ $set: { completed: { $not: "$completed" } } }],
      { returnDocument: "after" },
    );
    if (!updatedTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "toggled todo",
      data: `status completed:${updatedTodo.completed}`,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
}

async function deleteTodo(req, res) {
  const todoId = req.params.id;
  const userId = req.user.id;
  console.log(`Todo inside get by id:${todoId}`);

  if (!mongoose.isValidObjectId(todoId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Id.",
    });
  }
  try {
    const deletedTodo = await Todo.findOneAndDelete({
      _id: todoId,
      createdBy: userId,
    });
    if (deletedTodo === null)
      return res
        .status(400)
        .json({ success: false, message: "Unable to delete todo" });

    return res
      .status(200)
      .json({ success: true, message: "Todo deleted", data: deletedTodo });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "failed to delete Todo",
      error: err.message,
    });
  }
}
module.exports = {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  getTodoById,
};
