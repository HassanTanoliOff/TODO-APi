const express = require("express");
const router = express.Router();
const {verifyUser} = require('../middlewares/userAuthentication')
const { requestDataValidator } = require("../Validators/requestDataValidator");
const {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  getTodoById,
} = require("../controllers/todo");

router.use(verifyUser)

router.get("/", getTodos);
router.get("/:id", getTodoById);
router.post("/", requestDataValidator, addTodo);
router.patch("/toggle/:id", updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
