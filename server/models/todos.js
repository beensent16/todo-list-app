import { Schema , model } from "mongoose";

// Create Todo schema
const todoSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', // References the User model
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: '' // Optional field, can be empty
    }
}, { timestamps: true });


// Create the Todo model
const Todo = model('Todo', todoSchema);

// Export the Todo model
export default Todo;