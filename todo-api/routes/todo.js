const express = require('express')
const router = express.Router()
// const {dateTimeValidator} = require('../validators/dateValidator')
const {requestDataValidator} = require('../middlewares/requestDataValidator')
const {
  handle_GetTodos,
  handle_AddTodo,
  handle_UpdateTodo,
  handle_DeleteTodo,
  handle_GetTodoById,
} = require("../controllers/todo");



router.get('/',handle_GetTodos)
router.get('/:id',handle_GetTodoById)
router.post("/", requestDataValidator, handle_AddTodo);
router.patch('/:id/toggle',handle_UpdateTodo)
router.delete('/:id',handle_DeleteTodo)

module.exports = router;
