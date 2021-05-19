'use strict';

//setup
require('dotenv').config();
const mongoose = require('mongoose');


//import
const server = require('./src/server.js');

//connection string:
// MONGOOSE_URI = mongodb://localhost:27017/things 
mongoose
  .connect(process.env.MONGOOSE_URI,
    { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    server.start(process.env.PORT);
  })
  .catch((e) => {
    console.log('CONNECTION_ERROR', e.mssage);
  });

