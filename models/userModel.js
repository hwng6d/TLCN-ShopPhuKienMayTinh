const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		require: [true, 'Please give us your name'],
	},
	email: {
		type: String,
		require: [true, 'Please give us your email'],
		unique: [true, 'Email must be unique'],
		lowercase: true,
		validate: [validator.isEmail, 'Please provide a valid email'],
	},
	password: {
		type: String,
		require: [true, 'Please provide us your password'],
		minlength: [8, 'Password must be at least 8 characters'],
		select: false, //make this field is not visible in any output
	},
	passwordConfirm: {
		type: String,
		require: [true, 'Please confirm your password'],
		validate: {
			validator: function (elm) {
				return elm === this.password;
			},
			message: 'Passwords are not the same',
		},
	},
	photo: String,
	role: {
		type: String,
		enum: ['customer', 'assistant', 'admin'],
		default: 'customer',
	},
	passwordChangedAt: Date,
	passwordResetToken: String,
	passwordResetExpires: Date,
	active: {
		type: Boolean,
		default: true,
		select: false,
	},
});

//hash password before actually saving to the db
userSchema.pre('save', async function (next) {
	//only run this function if password is modified
	if (!this.isModified('password')) {
		return next();
	}

	//hash password with cost of 12
	this.password = await bcrypt.hash(this.password, 12);

	//delete passwordConfirm because no longer need to be persisted in db anymore
	this.passwordConfirm = undefined;

	next();
});

//add value to passwordChangedAt before password (but not rest of other fields) is changed
userSchema.pre('save', async function (next) {
	//check whether user is new or not recently changed password
	if (!this.isModified('password') || this.isNew) {
		return next();
	}

	this.passwordChangedAt = Date.now() - 1000;
	next();
});

//hide users which is inactive
userSchema.pre(/^find/, function (next) {
	this.find({ active: { $ne: false } });
	next();
});

//method to check if password is correct before actually logging in
userSchema.methods.correctPassword = async function (
	candidatePassword,
	userPassword
) {
	return await bcrypt.compare(candidatePassword, userPassword);
};

//method to check if password is changed after logging in, if not, restrict the actions
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
	if (this.passwordChangedAt) {
		const changedTimestamp = parseInt(
			this.passwordChangedAt.getTime() / 1000,
			10
		);

		return JWTTimestamp < changedTimestamp;
	}

	// False means NOT changed
	return false;
};

//method to create reset password token
userSchema.methods.createResetPasswordToken = function () {
	const resetToken = crypto.randomBytes(32).toString('hex');

	this.passwordResetToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex');

	console.log({
		resetToken,
		encryptedResetToken: this.passwordResetToken,
	});

	this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

	return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
