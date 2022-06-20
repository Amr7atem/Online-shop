const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Product must have a title'],
  },
  img: { 
    type: String,
     required: [true, 'Product must have an image']
  },
  description: {
    type: String,
    required: [true, 'Product must have a description'],
  },
  category: Array,
  size: Array,
  color: Array, 
  price: {
    type: Number,
    required: [true, 'Product must have price'],
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0'],
    set: (val) => Math.round(val * 10) / 10,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  
},
  { timestamps: true },
);
productSchema.index({ price: 1, ratingsAverage: -1 });

// Virtual Populate
productSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'product',
  localField: '_id',
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
