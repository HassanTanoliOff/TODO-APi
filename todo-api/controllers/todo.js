const Todo = require("../models/todo");
///////////////////////////////////////
////             Get Method       ////
/////////////////////////////////////
async function handle_GetTodos(req, res) {
  const allTodos = await Todo.find({});

  return res.status(200).json(allTodos);
}
async function handle_GetTodoById(req,res){
  const todoId = req.params.id;
  
  
}
////////////////////////////////////////
////            Post Method        ////
//////////////////////////////////////
async function handle_AddTodo(req, res) {
  const { title, description, completed, priority, dueDate } = req.body;

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
    return res.status(200).json({
      success: "Success",
      message: "Successfully added new Todo",
      data: result,
    });
  } catch (err) {
    return res.status(400).json({
      success: "Failed",
      message: "Failed to add Todo",
      error: err.message,
      data: newTodo,
    });
  }
}

////////////////////////////////////////
////           Patch Method        ////
//////////////////////////////////////

async function handle_UpdateTodo(req, res) {
  const todoId = req.params.id;
  let toggle = req.query.completed;
  console.log(
    `inside the body of toggle value:${toggle} type :${typeof toggle}`,
  );
  // if (toggle == "1" || toggle == "true") toggle = true;
  // if (toggle == "0" || toggle == "false") toggle = false;

  //// check if the input toggle in valid
  const allowed = [0, 1, "true", "false", "True", "False"];
  if (!allowed.includes(toggle))
    return res
      .status(400)
      .json({
        success: "failed",
        message: "Invalid toggle input allowed: 0/1 or true/false",
        data:`received input: ${toggle}`,
      });
  console.log(`toggle to bool value:${toggle}, Type:${typeof toggle}`);
  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: todoId },
      { $set: { completed: toggle } },
      { returnDocument: "after" },
    );
    return res.status(200).json({
      success: "Success",
      message: "toggled todo",
      data: `status completed:${updatedTodo.completed}`,
    });
  } catch (err) {
    return res.status(400).json({
      success: "Failed",
      message: "Something went wrong",
      error: err.message,
    });
  }
}

////////////////////////////////////////
////           Delete Method       ////
//////////////////////////////////////

async function handle_DeleteTodo(req,res) {
    const todoId = req.params.id

    try{
    const deletedTodo =  await Todo.findOneAndDelete({_id:todoId})
      return res.status(200).json({success:'Success',message:'Todo deleted' , data:deletedTodo})
    }
    catch(err){
      return res.status(400).json({success:"failed",message:'failed to delete Todo',error:err.message})
    }
}
module.exports = {
  handle_GetTodos,
  handle_AddTodo,
  handle_UpdateTodo,
  handle_DeleteTodo
};
