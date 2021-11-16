const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('./../models/userModel');
const Product = require('./../models/productModel');
const Purchase = require('./../models/purchasingModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
	// 1) Get currently purchased items in user cart
	const user = await User.findById(req.user.id);
	const products = [];
	user.cart.items.forEach((item) => {
		product = await Product.findById(item.productId);
		if (product) products.push(product);
	});

	// 2) Create checkout session
	stripe.checkout.session.create({
		payment_method_types: ['card'],
		success_url: `${req.protocol}://${req.get('host')}/`,
		cancel_url: `${req.protocol}://${req.get('host')}/cart`,
		customer_email: req.user.email,
		client_reference_id: req.user.id,
		line_items: products.forEach((product) => {
			return [
				{
					name: `Product: ${product.name}`,
					description: product.description,
					amout: product.price * 100,
					currency: 'usd',
					quantity: product,
				},
			];
		}),
	});

	// 3) Create session as response (send to client)
});
