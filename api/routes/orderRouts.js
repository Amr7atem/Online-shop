const express = require('express');
const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');

const router = express.Router();
router.route('/income').get(orderController.getIncome);

router
  .route('/')
  .get(
    orderController.getAllOrders
  )
  .post(orderController.createOrder);

router
  .route('/:id')
  .get(authController.protect, orderController.getOrder)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    orderController.updateOrder
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'shop'),
    orderController.deleteOrder
  );


module.exports = router;
