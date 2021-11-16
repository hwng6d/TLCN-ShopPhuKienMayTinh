const multer = require('multer');
const sharp = require('sharp');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

const filterObj = (obj, ...allowedFields) => {
	const newObj = {};
	Object.keys(obj).forEach((el) => {
		if (allowedFields.includes(el)) newObj[el] = obj[el];
	});
	return newObj;
};

// 1) FOR CUSTOMER
//Get me
exports.getMe = (req, res, next) => {
	req.params.id = req.user.id;
	next();
};

//Upload user photo
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

exports.uploadUserPhoto = upload.single('photo');

//Resize after uploading to the memory buffer
exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
	if (!req.file) return next();

	req.file.filename = `user-${req.user.id}-${Date.now().jpeg}`;

	await sharp(req.file.buffer)
		.resize(500, 500)
		.toFormat('jpeg')
		.jpeg({ quality: 90 })
		.toFile(`public/img/users/${req.file.filename}`);

	next();
});

//Update current user
exports.updateMe = catchAsync(async (req, res, next) => {
	// 1) Create error if user POSTs password data
	if (req.body.password || req.body.passwordConfirm) {
		return next(
			new AppError(
				'This route is not for password updates. Please use /updateMyPassword.',
				400
			)
		);
	}

	// 2) Filtered out unwanted fields names that are not allowed to be updated
	const filteredBody = filterObj(req.body, 'name', 'email');

	// 3) Update user document
	const updatedUser = await User.findByIdAndUpdate(
		req.user.id,
		filteredBody,
		{
			new: true,
			runValidators: true,
		}
	);

	res.status(200).json({
		status: 'success',
		data: {
			user: updatedUser,
		},
	});
});

//Delete current user
exports.deleteMe = catchAsync(async (req, res, next) => {
	const user = await User.findByIdAndUpdate(req.user.id, { active: false });
	res.status(204).json({
		status: 'success',
		data: null,
	});
});

// 2) FOR ADMIN (NOT COMPLETED YET)
//Get all users
exports.getAllUsers = factory.getAll(User);
//Get one user
exports.getUser = factory.getOne(User);
//Create new user
exports.createUser = (req, res) => {
	res.status(500).json({
		status: 'error',
		message:
			'This route is not yet defined! Instead, use sign up to create new user!',
	});
};
//Update a user
exports.updateUser = factory.updateOne(User);
//Delete a user
exports.deleteUser = factory.deleteOne(User);
