const mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  username: {type: String},
  email: {type: String},
  mobile: {type: String},
  city: {type: String}
})

mongoose.model('User', UserSchema);