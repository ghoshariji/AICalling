const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  credits: {
    type: Number,
    default: 0,
  },
  role: {
    type: String,
    enum: ['user', 'admin'], 
    default: 'user',
  },
  subUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubUser',
  }],
  transactions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction',
  }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
