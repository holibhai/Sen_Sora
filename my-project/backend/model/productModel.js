const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['cake', 'gift'],
    required: true
  },
  category: String, 
  flavor: String, 
  price: {
    type: Number,
    required: true
  },
  description: String,
  imageUrl: String,
  stock: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);
