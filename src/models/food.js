'use strict';

//setup 
const mongoose = require('mongoose');


//schema obj
const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String },
});

//model
const FoodModel = mongoose.model('Food', foodSchema);


//export model
module.exports = FoodModel;