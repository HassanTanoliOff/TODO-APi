const express = require('express')
const router = express.Router()
const {handle_GetTodos,handle_AddTodo} = require('../controllers/todo')



 router.get('/',handle_GetTodos)
router.post('/',handle_AddTodo)


module.exports = router;
