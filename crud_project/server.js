const express = require('express');
const env = require('dotenv');
env.config();
const connectDB = require('./database/db');
const Todo = require('./models/todo.model');

const app = express();


app.use(express.json());

connectDB();

app.get("/get", async (req, res) => {
    try{
        const result = await Todo.find();
        res.send({
            success: true,
            message : "todo fetched successfully",
            data : result
        });
    }catch(err){
        res.send({
            success: false,
            message : "",
            data : null
        });
    }
});

app.post("/add", async (req, res) => {
    try{
        const { text, priority, deadline } = req.body;
        const todo = new Todo({
            text,
            priority,
            deadline
        });
        await todo.save();
        res.send({
            success: true,
            message : "todo added successfully",
            data : todo
        });
    }catch(err){
        res.send({
            success: false,
            message : "",
            data : null
        });
    }
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
