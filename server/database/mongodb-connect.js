import mongoose from 'mongoose';

export default function connect (){
const database = "mongodb+srv://vjdatiles:qzGfvf2scXDOJ8yE@cluster0.w690d.mongodb.net/?retryWrites=true&w=majority&appName=ToDo";
mongoose
    .connect(database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'ToDo',
    }
    )
    .then(() => {
        console.log('Connected to MongoDB');
        return 'Connected to MongoDB';
    })
    .catch((error) => {    
        console.log('Error connecting to MongoDB');
    });
    
}