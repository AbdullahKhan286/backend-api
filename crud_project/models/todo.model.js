const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const todoSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.models.Todo || model('Todo', todoSchema);