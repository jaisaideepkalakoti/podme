// models/user.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
