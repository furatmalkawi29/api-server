'use strict';

//setup
const express = require('express');
const router = express.Router(); // used instead of app 

//import 
const DataMngr = require('../models/data-collection-class.js'); // class
const TodoModel = require('../models/todo.js'); // model


// create new DataMngr object 
const dataMngr = new DataMngr(TodoModel); //object



//routs 
router.get('/', getTodo);
router.get('/:id', getTodoWithId);
router.post('/', createTodo);
router.delete('/:id', deleteTodo);
router.put('/:id',updateTodo);



//handlers
async function getTodo (req,res, next){
  try {
    res.send(await dataMngr.read());
  } catch (error) {
    next(error);
  }
}


async function getTodoWithId (req,res, next){
  try {
    res.send(await dataMngr.read(req.params.id));
  } catch (error) {
    next(error);
  }
}


async function createTodo (req,res, next){
  try {
    res.status(201).send(await dataMngr.create(req.body));
  } catch (error) {
    next(error);
  }
}


async function deleteTodo (req,res, next){
  try {
    res.send(await dataMngr.delete(req.params.id));
  } catch (error) {
    next(error);
  }
}


async function updateTodo (req,res, next){
  try {
    const todoObj = req.body;
    const resObj = await dataMngr.update(req.params.id, todoObj);
    res.json(resObj);  } catch (error) {
    next(error);
  }
}


//export rout-module
module.exports = router;



