const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
 userId:{
    type: String,
    required: true,
    unique: true
  },
 
  firstName: {
    type: String,
    required: true
  },
    lastName: {
        type: String,
        required: true
    },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  address: String,
  phone: String,
  
});

module.exports = mongoose.model('User', userSchema);
