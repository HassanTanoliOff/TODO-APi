const express = require("express");
const todoRouter = require("./routes/todo");
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

module.exports = app;
