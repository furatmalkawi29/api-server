'use strict';

//setup 
const mongoose = require('mongoose');


//schema obj
const clothesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String },
});

//model
const ClothesModel = mongoose.model('Clothes', clothesSchema);


//export model
module.exports = ClothesModel;