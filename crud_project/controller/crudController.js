
const Todo = require('../models/todo.model');

const getTodo = async (req, res) => {
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
};

const addTodo = async (req, res) => {
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
};

module.exports = { getTodo, addTodo};
