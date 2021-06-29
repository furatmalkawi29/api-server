'use strict';

//setup 
const mongoose = require('mongoose');


//schema obj
const todoSchema = mongoose.Schema({
  text: { type: String, required: true },
  assignee: { type: String },
  complete: { type: Boolean, default:false },
  difficulty: { type: Number, default: 1 },
});

//model
const TodoModel = mongoose.model('Todo', todoSchema);


//export model
module.exports = TodoModel;