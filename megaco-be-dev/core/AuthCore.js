const mongoose = require('mongoose');

const User = require('../models/User');

const AuthService = require('../services/AuthService');
const Enum = require('../config/Enum');

module.exports = {
    login: async (accountName, password) => {
        let generatedToken = null;

        const foundUser = await User.findOne({
            $or: [{
                username: accountName
            }, {
                email: accountName
            }, {
                phone: accountName
            }],
            password
        });

        if (foundUser) {
            if (!foundUser.isActive) {
                throw new Error('Account is blocked!');
            }

            generatedToken = await AuthService.generateToken({
                permission: foundUser.permission
            }) || null;
        } else {
            throw new Error('Username or password is incorrect!');
        }

        return generatedToken;
    },

    register: async ({
        username,
        password,
        phone,
        email,
        fullname,
        permission
    }) => {
        const newUser = new User({
            username,
            password,
            phone,
            email,
            fullname,
            permission
        });

        return await newUser.save();
    },

    resetPassword: async ({
        accountName
    }) => {
        const foundUser = await User.findOne({
            $or: [{
                username: accountName
            }, {
                email: accountName
            }, {
                phone: accountName
            }]
        });

        if (foundUser) {
            return true;
        } else {
            throw new Error('account not found');
        }

        return false;
    }
}