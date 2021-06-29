//setup 
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');


//import 
const notFoundHndler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');
const foodRoutes = require('./routes/food.js');
const clothesRoutes = require('./routes/clothes.js');
const todoRoutes = require('./routes/todo.js');



//use
app.use(express.json()); // to use body / post, put, patch
app.use(morgan('dev')); // console each req / debugging
app.use(cors());

// use rout-modules
app.use('/api/v1/food', foodRoutes);
app.use('/api/v1/todo', todoRoutes);
app.use('/api/v1/clothes', clothesRoutes);


// use err-handlers
app.use('*', notFoundHndler);
app.use(errorHandler);


module.exports = {
  server: app,
  start: (port) => {
    const PORT = port || 3000;
    app.listen(PORT, () => console.log(`the server is up on ${PORT}`));
  },
};