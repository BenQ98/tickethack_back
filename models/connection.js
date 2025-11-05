const mongoose = require('mongoose');

const connectionString = process.env.CONNECTION_STRING;
console.log("CONNECTION_STRING:", process.env.CONNECTION_STRING ? "OK chargée" : "NON DÉFINIE");

mongoose.connect(connectionString, { 
  connectTimeoutMS: 2000 
})
  .then(() => console.log('Database connected'))
  .catch(error => console.error(error));