import express from "express";
import verifyUser from "../middlewares/userAuthentication.js";
import requestDataValidator from "../Validators/requestDataValidator.js";
const router = express.Router();
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  getTodoById,
} from "../controllers/todo.js";

router.use(verifyUser);

router.get("/", getTodos);
router.get("/:id", getTodoById);
router.post("/", requestDataValidator, addTodo);
router.patch("/toggle/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
