const express = require('express');
const productController = require('../controllers/productController');
const authController = require('./../controllers/authController');
const reviewRoutes = require('./../routes/reviewRoutes');

//Create router for product
const router = express.Router();

router.use('/:productId/reviews', reviewRoutes);

router
	.route('/')
	.get(productController.getAllProducts)
	.post(
		authController.protect,
		authController.restrictTo('admin', 'assistant'),
		productController.createProduct
	);
router
	.route('/:id')
	.get(productController.getProduct)
	.patch(
		authController.protect,
		authController.restrictTo('admin', 'assistant'),
		productController.updateProduct
	)
	.delete(
		authController.protect,
		authController.restrictTo('admin'),
		productController.deleteProduct
	);

//export for using in app
module.exports = router;
