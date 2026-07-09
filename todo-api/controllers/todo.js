const Todo = require("../models/todo");

async function handle_GetTodos(req, res) {
  const allTodos = await Todo.find({});

  return res.json(allTodos);
}

async function handle_AddTodo(req, res) {
  const{ title, description, completed, priority, dueDate }  = req.body;
 
// console.log('before new Todo body is:',title, description, completed, priority, dueDate);
  const newTodo = {
    title,
    description,
    completed,
    priority,
    dueDate,
  };
  // console.log("Before adding new todo:",newTodo)
  try {
    const result = await Todo.create(newTodo);
    return res.json({
      success: "Success",
      message: "Successfully added new Todo",
      data: result,
    });
  } catch (err) {
    return res.json({
      success: "Failed",
      message: "Failed to add Todo",
      error: err.message,
      data: newTodo,
    });
  }
}

module.exports = {
  handle_GetTodos,
  handle_AddTodo,
};
