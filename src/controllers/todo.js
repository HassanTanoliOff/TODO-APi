const Todo = require("../models/todo");

async function getTodos(req, res) {

  const allTodos = await Todo.find({ completed: true });

  return res.status(200).json(allTodos);
}
async function getTodoById(req, res) {
  const todoId = req.params.id;
  if (todoId.length != 24)
    return res
      .status(400)
      .json({ success: false, message: "Invalid Id", data: todoId });
  try {
    const foundTodo = await Todo.findOne({ _id: todoId });
    if (!foundTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo Not found",
        data: foundTodo,
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

  console.log(
    "before new Todo body is:",
    title,
    description,
    completed,
    priority,
    dueDate,
  );

  const newTodo = {
    title,
    description,
    completed,
    priority,
    dueDate,
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
  const todoId = req.params.id;
  let toggle = req.query.completed;
  console.log(
    `inside the body of toggle value:${toggle} type :${typeof toggle}`,
  );

  const allowed = [0, 1, "true", "false", "True", "False"];
  if (!allowed.includes(toggle))
    return res.status(400).json({
      success: false,
      message: "Invalid toggle input allowed: 0/1 or true/false",
      data: `received input: ${toggle}`,
    });
  console.log(`toggle to bool value:${toggle}, Type:${typeof toggle}`);
  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: todoId },
      { $set: { completed: toggle } },
      { returnDocument: "after" },
    );
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
  console.log(`Todo inside get by id:${todoId}`);
  try {
    const deletedTodo = await Todo.findOneAndDelete({ _id: todoId });
    if (deletedTodo === null)  return res
      .status(400)
      .json({ success: false, message: "Unable to delete todo" });
      
    return res
      .status(200)
      .json({ success: true , message: "Todo deleted", data: deletedTodo });
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
