const express = require('express');
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');
const reviewRouter = require('./reviewRouts');

const router = express.Router();
router.use('/:productId/reviews', reviewRouter);

router
  .route('/')
  .get(productController.getAllProducts)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'shop'),
    productController.createProduct
  );

router
  .route('/find/:id')
  .get(productController.getProduct)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'shop'),
    productController.updateProduct
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'shop'),
    productController.deleteProduct
  );

module.exports = router;
