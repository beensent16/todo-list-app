import express from "express";
import Todo from "../models/todos.js";
import User from "../models/user.js"; // Assuming the model is in models/user.js

const todosRouter = express.Router();

// GET all todos or a specific one if query `id` is provided
todosRouter.get("/todos/:userId", async (req, res) => {
  const { userId } = req.params;
  const todoId = req.query.id;

  try {
    if (todoId) {
      // Fetch a specific todo for the user
      const todo = await Todo.findOne({ _id: todoId, user: userId });
      if (todo) {
        return res.json(todo);
      }
      return res.status(404).json({ error: "Todo not found" });
    } else {
      // Fetch all todos for the user
      const todos = await Todo.find({ user: userId });
      return res.json(todos);
    }
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// POST: Create a new todo for the user
todosRouter.post("/todos/:userId", async (req, res) => {
  const { userId } = req.params;
  const { title, description } = req.body;

  try {
    // Ensure user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create the new todo
    const newTodo = await Todo.create({
      user: userId,
      title,
      description,
    });

    return res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "Failed to create Todo" });
  }
});

// PUT: Update a todo by its ID for a specific user
todosRouter.put("/todos/:userId/:todoId", async (req, res) => {
  const { userId, todoId } = req.params;
  const { title, description } = req.body;

  try {
    // Update the todo
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: todoId, user: userId },
      { title, description },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    return res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: "Failed to update Todo" });
  }
});

// DELETE: Remove a todo by its ID
todosRouter.delete("/todos/:todoId", async (req, res) => {
  const { todoId } = req.params;

  try {
    const deletedTodo = await Todo.findByIdAndDelete(todoId);

    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    return res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete Todo" });
  }
});

export default todosRouter;