const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Brand = require('../models/Brand');
const Logistic = require('../models/Logistic')
const Enum = require('../config/Enum');
const Warranty = require('../models/Warranty');
const moment = require('moment');
module.exports = {
    getAll: async ({
        limit,
        offset,
        shopId,
        keyword,
        categoryId,
        logicticsId,
        warrantyId,
        brandId,
        price,
        stock,
        weight
    }) => {
        let queryObj = {
            shopId,
            productName: {
                $regex: new RegExp(`${keyword}`)
            },
            categoryId,
            logicticsId,
            warrantyId,
            brandId,
            price: price && {
                $gte: price.from,
                $lte: price.to
            },
            stock: stock && {
                $gte: stock.from,
                $lte: stock.to
            },
            weight: weight && {
                $gte: weight.from,
                $lte: weight.to
            },
            isDeleted: false
        }

        Object.keys(queryObj).forEach(key => {
            if (queryObj[key] === undefined) {
                delete queryObj[key]
            }
        })

        const totalItems = await Product.find(queryObj).countDocuments();

        const products = await Product.find(queryObj).limit(limit).skip(offset);

        const modifiedProducts = [];
        products.forEach(prd => modifiedProducts.push({
            productId: prd.id,
            productName: prd.productName,
            sku: prd.sku,
            price: prd.price,
            condition: prd.condition,
            model: prd.model,
            stock: prd.stock,
            images: prd.images
        }));

        return {
            products: modifiedProducts,
            totalItems
        };
    },

    removeProduct: async ({
        productId
    }) => {
        return await Product.updateOne({
                _id: productId
            }, {
                isDeleted: true
            }).then(result => {
                if (result.n === 0) {
                    throw 'Product not found';
                }
                if (result.nModified === 0) {
                    return false;
                }
                return true;
            })
            .catch(err => {
                if (err.kind === 'ObjectId' && err.name === 'CastError') {
                    if (err.path === '_id') {
                        err.path = 'productId';
                    }
                    throw `${err.path} is invalid`;
                }
            });
    },

    checkExited: async (
        productName
    ) => {
        return await Product.findOne({
                productName: productName
            }).then(product => {
                if (!product)
                    return true;
                else return false;
            })
            .catch(err => {
                console.log(err);
                return err;

            })
    },

    checkCategory: async (
        categoryId
    ) => {
        return await Category.findOne({
                _id: categoryId
            })
            .then(category => {
                // console.log(category)
                if (!category || category === "")
                    return false;
                else return true;
            })
            .catch(err => {
                console.log(err);
                return err;
            })
    },

    checkBrand: async (
        brandId
    ) => {
        return await Brand.findOne({
                _id: brandId
            })
            .then(brand => {
                if (!brand || brand === "")
                    return false;
                else return true;
            })
            .catch(err => {
                console.log(err);
                return err;

            })
    },

    checkLogistic: async (
        logisticId
    ) => {
        if (logisticId === "")
            return true;
        return await Logistic.findOne({
                _id: logisticId
            })
            .then(logistic => {
                if (!logistic || logistic === "")
                    return false;
                else return true;
            })
            .catch(err => {
                console.log(err);
                return err;

            })
    },


    checkWarranty: async (
        warrantyId
    ) => {
        if (warrantyId === "")
            return true;
        return await Warranty.findOne({
                _id: logisticId
            })
            .then(warranty => {
                if (!warranty || warranty === "")
                    return false;
                else return true;
            })
            .catch(err => {
                console.log(err);
                return err;

            })
    },

    checkSKU: async (
        SKU
    ) => {

        return await Product.findOne({
                sku: SKU
            })
            .then(product => {
                if (!product || product === "")
                    return true;
                else return false;
            })
            .catch(err => {
                console.log(err);
                return err;

            })
    },

    addProduct: async (
        shopId,
        categoryId,
        categoryName,
        logisticsId,
        warrantyId,
        brandId,
        productName,
        price,
        sku,
        condition,
        model,
        specialPrice,
        stock,
        shortDescription,
        longDescription,
        variations,
        attributes,
        weight,
        images,
        packageInfo,

    ) => {
        let product = new Product({
            shopId: shopId,
            categoryId: categoryId,
            categoryName: categoryName,
            logisticsId: logisticsId,
            warrantyId: warrantyId,
            brandId: brandId,
            productName: productName,
            price: price,
            sku: sku,
            condition: condition,
            model: model,
            specialPrice: specialPrice,
            stock: stock,
            shortDescription: shortDescription,
            longDescription: longDescription,
            variations: variations,
            attributes: attributes,
            weight: weight,
            images: images,
            packageInfo: packageInfo,
            createdAt: moment.now(),
            updatedAt: moment.now(),
        })
        return await product.save().then(pro => {
            if (pro)
                return pro._id;
            else if (!pro || pro === "")
                return false;
        }).catch(err => {
            console.log(err);
            return false;

        })
    }

}