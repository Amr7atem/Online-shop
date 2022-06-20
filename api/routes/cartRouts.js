const express = require('express');
const cartController = require('../controllers/cartController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'shop'),
    cartController.getAllCarts
  )
  .post(cartController.createCart);

router
  .route('/:id')
  .get(authController.protect, cartController.getCart)
  .patch(authController.protect, cartController.updateCart)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'shop'),
    cartController.deleteCart
  );

module.exports = router;
