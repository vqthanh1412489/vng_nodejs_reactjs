const mongoose = require('mongoose');
const User = require('../models/User');

const Enum = require('../config/Enum');

module.exports = {

    getAllShops: async ({
        userId
    }) => {
        return await User.findOne({
                _id: userId
            },{
                shops: 1
            }).then(user => {
                if (!user || !user.shops) {
                    return undefined;
                }

                return user.shops;
            })
            .catch(err => {
                if (err.kind === 'ObjectId' && err.name === 'CastError') {
                    if (err.path === '_id') {
                        err.path = 'userId';
                    }
                    throw `${err.path} is invalid`;
                }
            });
    },

    getShopInfo: async ({
        shopId
    }) => {
        return await User.findOne({
                'shops._id': shopId
            },{
                'shops.$': 1
            }).then(user => {
                if (!user) {
                    return undefined;
                }

                return user.shops[0];
            })
            .catch(err => {
                if (err.kind === 'ObjectId' && err.name === 'CastError') {
                    if (err.path === '_id') {
                        err.path = 'shopId';
                    }
                    throw `${err.path} is invalid`;
                }
            });
    },

    createShop: async ({
        userId,
        shopName
    }) => {
        return await User.updateOne({
                _id: userId
            }, {
                $push: {
                    shops: {
                        _id: mongoose.Types.ObjectId(),
                        shopName
                    }
                }
            }).then(result => {
                if (result.n === 0) {
                    throw 'User not found';
                }
                if (result.nModified === 0) {
                    return false;
                }
                return true;
            })
            .catch(err => {
                if (err.kind === 'ObjectId' && err.name === 'CastError') {
                    if (err.path === '_id') {
                        err.path = 'userId';
                    }
                    throw `${err.path} is invalid`;
                }
            });
    },

    updateShop: async ({
        userId,
        shopId,
        shopName
    }) => {
        return await User.updateOne({
                _id: userId,
                'shops._id': shopId
            }, {
                $set: {
                    'shops.$.shopName': shopName
                }
            }).then(updateResult => {
                if (updateResult.n === 0) {
                    throw 'Shop not found';
                }
                if (updateResult.nModified === 0) {
                    return false;
                }
                return true;
            })
            .catch(err => {
                console.log(err);
                if (err.kind === 'ObjectId' && err.name === 'CastError') {
                    if (err.path === '_id') {
                        err.path = 'userId or shopId';
                    }
                    throw `${err.path} is invalid`;
                }
            });
    }
}