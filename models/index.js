const mongoose = require('mongoose');

console.log("Database connecting...")
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser:true}, err => {
  if (!err) {
    console.log("Database connected")
  }
  else {
    console.log("Error while connecting database:", err);
  }
})

const User = require("./user.model");