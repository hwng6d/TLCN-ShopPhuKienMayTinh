const mongoose = require('mongoose');
const slugify = require('slugify');

//create schema of products and model
const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		slug: String,
		price: {
			type: Number,
			require: true,
			min: [0, 'Price of product must be at least 0'],
		},
		priceDiscount: {
			type: Number,
			validate: {
				validator: function (val) {
					return val < this.price;
				},
				message: `Price discount ({VALUE}) must be below regular price.`,
			},
		},
		description: {
			type: String,
			trim: true,
		},
		details: {
			type: Array,
			default: [],
		},
		imageCover: {
			type: String,
			required: [true, 'A product must have a image cover'],
		},
		images: [String],
		ratingsAverage: {
			type: Number,
			default: 4.5,
			min: [1, 'Rating must be above 1'],
			max: [5, 'Rating must be below 5'],
			set: (val) => Math.round(val * 10) / 10,
		},
		ratingsQuantity: {
			type: Number,
			default: 0,
		},
		origin: String,
		manufacturer: String,
		quantity: {
			type: Number,
			require: true,
		},
		category: {
			type: String,
			require: true,
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

productSchema.index({ slug: 1 });

//VIRTUAL POPULATE
productSchema.virtual('reviews', {
	ref: 'Review',
	foreignField: 'product',
	localField: '_id',
});

//DOCUMENT MIDDLEWARE: slug
productSchema.pre('save', function (next) {
	this.slug = slugify(this.name, { lower: true });
	next();
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
