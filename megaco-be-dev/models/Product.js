// External Dependencies
const mongoose = require('mongoose');

// Schema
const ProductSchema = mongoose.Schema({
    
    shopId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    logisticsId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
    },
    warrantyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },


    productName: { type: String, required: [true, "can't be blank"] },
    price: { type: Number, required: [true, "can't be blank"] },
    sku: {
        type: String,
        required: true,
    },
    condition: {
        type: String,
    },
    model: {
        type: String,
        required: false,
    },


    specialPrice: {
        price: { type: Number },
        max: { type: Number },
        min: { type: Number },
        startDate: { type: Date },
        endDate: { type: Date },
    },

    stock: {
        type: Number,
        required: true,
    },
    shortDescription: {
        type: String,
        required: true
    },
    longDescription: {
        type: String,
        required: false,
    },
    variations: [{
        name: { type: String },
        stock: { type: Number },
        price: { type: Number },
        variationSKU: { type: String, unique: true }
    }],
    attributes: [{
        name: { type: String },
        value: { type: String }
    }],
    weight: { type: Number, required: true },
    images: [{ type: String }],
    packageInfo: {
        packageHeight: {type: Number, require: true},
        packageLength: {type: Number, require: true},
        packageWidth: {type: Number, require: true},
        packageWeight: {type: Number, require: true},
    },

    updateAt:{
        type: Date,
    },
    createdAt: {
        type: Date,
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

// Create Model
var Product = module.exports = mongoose.model('Product', ProductSchema);
