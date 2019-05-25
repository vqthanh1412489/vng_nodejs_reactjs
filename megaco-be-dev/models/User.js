const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
    shopName: {
        type: String,
        required: true
    },

    updateAt: {
        type: Date,
    },
    createdAt: {
        type: Date,
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

const UserSchema = new mongoose.Schema({
    shops: [ShopSchema],
    username: {
        type: String,
        unique: true,
        required: [true, "can't be blank"]
    },
    password: {
        type: String,
        required: [true, "can't be blank"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "can't be blank"]
    },
    phone: {
        type: String,
        unique: true,
        required: [true, "can't be blank"]
    },
    fullname: {
        type: String
    },
    permission: {
        type: String,
        required: [true, "can't be blank"]
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
    },
    isDeleted: {
        type: Boolean,
        default: false
    }


}, {
    timestamps: true
});

var User = module.exports = mongoose.model('User', UserSchema);