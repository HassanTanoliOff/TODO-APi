import express from "express";
import todoRouter from "./routes/todo.js";
import userRouter from "./routes/user.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
  return res.status(200).json({
    success: "Success",
    message: "Application Is healthy",
  });
});
app.use("/api/todo", todoRouter);
app.use("/api/user", userRouter);

export default app;
