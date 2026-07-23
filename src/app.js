import express from "express";
import todoRouter from "./routes/todo.js";
import userRouter from "./routes/user.js";
import path from "path";
const app = express();

// ── CORS — allow frontend to connect ─────────────────────────
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/src/uploads", express.static("src/uploads"));

app.get("/health", (req, res) => {
  return res.status(200).json({
    success: "Success",
    message: "Application Is healthy",
  });
});
app.use("/api/todo", todoRouter);
app.use("/api/user", userRouter);

export default app;
