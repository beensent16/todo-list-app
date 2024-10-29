import express from "express";
import todosRouter from "./routes/todos.js";
import connect from "./database/mongodb-connect.js";
import usersRouter from "./routes/users.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 4000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files
app.use("/js", express.static(path.resolve(__dirname, "routes"))); // Serve spa.js from /js
app.use(express.static(path.resolve(__dirname, "../frontend")));    // Serve frontend files

// API routes
app.use("/api", usersRouter);
app.use("/api", todosRouter);

// Database connection
connect();

// SPA route handler: Send index.html for any unmatched route
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend", "index.html"));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});