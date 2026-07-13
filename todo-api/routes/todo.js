const express = require("express");
const router = express.Router();

const { requestDataValidator } = require("../middlewares/requestDataValidator");
const {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  getTodoById,
} = require("../controllers/todo");

router.get("/", getTodos);
router.get("/:id", getTodoById);
router.post("/", requestDataValidator, addTodo);
router.patch("/:id/toggle", updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
