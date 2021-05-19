'use strict';

//setup
const express = require('express');
const router = express.Router(); // used instead of app 

//import 
const DataMngr = require('../models/data-collection-class.js'); // class
const ClothesModel = require('../models/clothes.js'); // model


// create new DataMngr object 
const dataMngr = new DataMngr(ClothesModel); //object



//routs 
router.get('/', getClothes);
router.get('/:id', getClothesWithId);
router.post('/', createClothes);
router.delete('/:id', deleteClothes);
router.put('/:id',updateClothes);



//handlers
async function getClothes (req,res, next){
  try {
    res.send(await dataMngr.read());
  } catch (error) {
    next(error);
  }
}


async function getClothesWithId (req,res, next){
  try {
    res.send(await dataMngr.read(req.params.id));
  } catch (error) {
    next(error);
  }
}


async function createClothes (req,res, next){
  try {
    res.status(201).send(await dataMngr.create(req.body));
  } catch (error) {
    next(error);
  }
}


async function deleteClothes (req,res, next){
  try {
    res.send(await dataMngr.delete(req.params.id));
  } catch (error) {
    next(error);
  }
}


async function updateClothes (req,res, next){
  try {
    const clothesObj = req.body;
    const resObj = await dataMngr.update(req.params.id, clothesObj);
    res.json(resObj);   } catch (error) {
    next(error);
  }
}


//export rout-module
module.exports = router;



