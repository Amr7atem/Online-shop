const Cart = require('../models/cartModel');
// const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllCarts = factory.getAll(Cart);
exports.getCart = factory.getOne(Cart);
exports.createCart = factory.createOne(Cart);
exports.updateCart = factory.updateOne(Cart);
exports.deleteCart = factory.deleteOne(Cart);
