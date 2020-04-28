const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    default: '',
  },
  lastName: {
    type: String,
    default: '',
  },
  username: {
    type: String,
  },
  email: {
    type: String,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
