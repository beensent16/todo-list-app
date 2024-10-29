import express from "express";
const Router = express.Router();
import User from "../models/user.js";

Router.post("/users", async (req, res) => {
const user = req.body;

    //TODO: create a new user to database
    const result = await User.create(user)
    return res.status(201).json(result);

});

Router.get("/users/:id", async (req, res) => {
    const id = req.params.id;
    let errorMessage = null;
    try {  
        const user = await User.findById(id);
        if (user) {
            return res.json(user)
        }

        errorMessage = "User not found";
    } catch (error) {
        errorMessage = "User not found or invalid id";
        res.status(404).json({error: errorMessage});
    }
});

export default Router;