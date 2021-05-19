'use strict';

//setup
const express = require('express');
const router = express.Router(); // used instead of app 

//import 
const DataMngr = require('../models/data-collection-class.js'); // class
const FoodModel = require('../models/food.js'); // model


// create new DataMngr object 
const dataMngr = new DataMngr(FoodModel); //object



//routs 
router.get('/', getFood);
router.get('/:id', getFoodWithId);
router.post('/', createFood);
router.delete('/:id', deleteFood);
router.put('/:id',updateFood);



//handlers
async function getFood (req,res, next){
  try {
    res.send(await dataMngr.read());
  } catch (error) {
    next(error);
  }
}


async function getFoodWithId (req,res, next){
  try {
    res.send(await dataMngr.read(req.params.id));
  } catch (error) {
    next(error);
  }
}


async function createFood (req,res, next){
  try {
    res.status(201).send(await dataMngr.create(req.body));
  } catch (error) {
    next(error);
  }
}


async function deleteFood (req,res, next){
  try {
    res.send(await dataMngr.delete(req.params.id));
  } catch (error) {
    next(error);
  }
}


async function updateFood (req,res, next){
  try {
    const foodObj = req.body;
    const resObj = await dataMngr.update(req.params.id, foodObj);
    res.json(resObj);  } catch (error) {
    next(error);
  }
}


//export rout-module
module.exports = router;



