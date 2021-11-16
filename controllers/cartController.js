const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError');
const Product = require('../models/productModel');

// 1) FOR CUSTOMER
exports.addToCart = catchAsync(async (req, res, next) => {
	const cart = await req.user.addToCart(req.body.productId);

	res.status(201).json({
		status: 'success',
		data: {
			doc: cart,
		},
	});
});

exports.getCart = catchAsync(async (req, res, next) => {
	const cart = await req.user.populate('cart.items.productId');

	res.status(400).json({
		status: 'success',
		data: {
			doc: cart,
		},
	});
});

exports.decreaseCart = catchAsync(async (req, res, next) => {
	const decreasedCart = await req.user.decreaseFromCart(req.body.productId);

	res.status(200).json({
		status: 'success',
		data: {
			doc: decreasedCart,
		},
	});
});

exports.deleteCart = catchAsync(async (req, res, next) => {
	const deletedCart = await req.user.removeFromCart(req.body.productId);

	res.status(200).json({
		status: 'success',
		data: {
			doc: deletedCart,
		},
	});
});
// exports.updateCart = catchAsync(async (req, res, next) => {
// 	// api/v1/users/{user_id}/cart/{cart_id}
// 	const updatedCart = await Cart.findByIdAndUpdate(
// 		//id: cartId
// 		req.params.cartId,
// 		{
// 			// body: user, product[{productId, quantity}]
// 			$set: req.body,
// 		},
// 		{
// 			new: true,
// 			runValidators: true,
// 		}
// 	);

// 	res.status(200).json({
// 		status: 'success',
// 		data: {
// 			doc: updatedCart,
// 		},
// 	});
// });

// exports.deleteCart = catchAsync(async (req, res, next) => {
// 	// api/v1/users/{user_id}/cart/{cart_id}
// 	await Cart.findByIdAndDelete(req.params.cartId);

// 	res.status(204).json({
// 		status: 'success',
// 		data: null,
// 	});
// });

// // 2) FOR ADMIN
// //get all carts on system
// exports.getAllCarts = catchAsync(async (req, res, next) => {
// 	const carts = await Cart.find();

// 	res.status(200).json({
// 		status: 'success',
// 		data: carts,
// 	});
// });

// //get cart of specified user
// exports.getCart = catchAsync(async (req, res, next) => {
// 	const cart = await Cart.findOne({ user: req.params.userId });

// 	res.status(200).json({
// 		status: 'message',
// 		data: cart,
// 	});
// });
