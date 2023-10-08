const mongoose = require('mongoose');
const validator = require('validator');


const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 50,
  },

  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 8,
  }
},
{ timestamps: true }
);



module.exports = mongoose.model('User', UserSchema);