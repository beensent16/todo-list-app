import express from "express";
const todosRouter = express.Router();
 
 
// reading all todo items
todosRouter.get("/todos", (req, res) => {
  res.send("Get All TODOS");
});
 
 
// getting specific todo item with id as parameter
todosRouter.get("/todos/:id", (req, res) => {
  // get the todo id from the url
  const todoId = req.params.id;
 
 
  res.send(`Getting todo with id ${todoId}`);
});
 
 
// creating a new todo item
todosRouter.post("/todos", (req, res) => {
  // get the data from the request body
  const data = req.body;
 
  console.log(data);
 
  // send back the data
  res.json({
    status: 200,
  });
});
 
 
// updating a todo item
todosRouter.put("/todos/:id", (req, res) => {
  // get the todo id from the url
  const todoId = req.params.id;
  const data = req.body;
 
 
  res.json({ ...data, id: todoId });
});
 
 
// deleting a todo item
todosRouter.delete("/todos/:id", (req, res) => {
  // get the todo id from the url
  const todoId = req.params.id;
 
 
  res.send(`Deleting todo with id ${todoId}`);
});

export default todosRouter;