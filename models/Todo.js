// models/Todo.js
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  text: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
