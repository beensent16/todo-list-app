import { Schema , model } from "mongoose";

//Create the schema
const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
});

//Create the model
const User = model('User', userSchema);

//Export the model
export default User;