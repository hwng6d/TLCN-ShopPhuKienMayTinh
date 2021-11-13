const multer = require('multer');
const sharp = require('sharp');
const Product = require('./../models/productModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

//Upload product imageCover
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith('image')) {
		cb(null, true);
	} else {
		cb(new AppError('Not an image! Please upload only image', 400), false);
	}
};

const upload = multer({
	storage: multerStorage,
	fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single('imageCover');

//Resize after uploading to the memory buffer
exports.resizeImageCover = catchAsync(async (req, res, next) => {
	if (!req.file) return next();

	req.file.filename = `product-${req.product.id}-${Date.now().jpeg}`;

	await sharp(req.file.buffer)
		.resize(500, 500)
		.toFormat('jpeg')
		.jpeg({ quality: 90 })
		.toFile(`public/img/products/${req.file.filename}`);

	next();
});

//get all products
exports.getAllProducts = factory.getAll(Product);

//get product
exports.getProduct = factory.getOne(Product, { path: 'reviews' });

//Create new product
exports.createProduct = factory.createOne(Product);

//Update a product
exports.updateProduct = factory.updateOne(Product);

//Delete a product
exports.deleteProduct = factory.deleteOne(Product);
