// External Dependencies
const router = require('express').Router();

// Internal Dependencies
const DefaultRoutes = require('../../config/DefaultRoutes');
const Helper = require('../../utils/Helper');
const Brand = require('../../models/Brand');
const responseBuilder = require('../../utils/ResponseBuilder').buildReponse;
const returnCode = require('../../config/Enum').RETURN_CODE;
const moment = require('moment');

// Add one brand
router.post(DefaultRoutes.BRAND.ADD, (req, res) => {
    const data = req.body;
    const brandName = data.brandName,
        globalIdentifier = data.globalIdentifier;

    Brand.find({
        $or: [{
            brandName: brandName
        }, {
            globalIdentifier: globalIdentifier
        }]
    }, function (err, brand) {
        if (err) {
            res.json(responseBuilder(returnCode.FAILURE, "Mongo response error", ""));
            return;
        } else {
            if (brand != "") {
                res.json(responseBuilder(returnCode.FAILURE, "Brand has exited", ""));
            } else {
                var brand = new Brand({
                    brandName: brandName,
                    globalIdentifier: globalIdentifier,
                    isActive: true,
                    createdAt: moment().format(),
                    isDeleted: false
                });
                brand.save(function (err) {
                    if (err) {
                        res.json(responseBuilder(returnCode.FAILURE, "Mongo response error", ""));
                        return;
                    } else {
                        res.json(responseBuilder(returnCode.SUCCESS, "Add success", {
                            brand: brand
                        }));
                        return;
                    }
                })
            }
        }
    });
});

// Get One brand

router.post(DefaultRoutes.BRAND.GET_ONE, (req, res) => {
    const brandId = req.body.brandId;
    Brand.findOne({
        _id: brandId
    }, (err, brand) => {
        if (err) {
            console.log(err);
            res.json(responseBuilder(returnCode.FAILURE, "Mongo response error", ""));
            return;
        } else {
            res.json(responseBuilder(returnCode.SUCCESS, "Get one brand success", {
                brand: brand
            }));
            return;
        }
    });
})

// Get All brand
router.post(DefaultRoutes.BRAND.GET_ALL, (req, res) => {
    const data = req.body;
    const limit = data.limit,
        offset = data.offset,
        keyword = data.keyword;
    Brand.find({
        brandName: {
            $regex: new RegExp(keyword)
        }
    }, (err, brands) => {
        Brand.find({
            brandName: {
                $regex: new RegExp(keyword)
            }
        }).countDocuments((err, count) => {
            if (err) {
                console.log(err);
                res.json(responseBuilder(returnCode.FAILURE, "Mongo response error", ""));
                return;
            } else {
                res.json(responseBuilder(returnCode.SUCCESS, "Get one all success", {
                    totalItems: count,
                    brands: brands
                }));
                return;
            }
        });

    }).limit(limit).skip(offset);
})

// Update one brand
router.post(DefaultRoutes.BRAND.UPDATE, (req, res) => {
    const data = req.body;
    const brandName = data.brandName;
    const globalIdentifier = data.globalIdentifier;
    const brandId = data.brandId;
    // console.log(data);
    Brand.findOne({
        _id: brandId
    }, (err, brand) => {
        if (err) {
            res.json(responseBuilder(returnCode.FAILURE, "Mongo response error", ""));
            return;
        } else {
            if (brand === "") {
                res.json(responseBuilder(returnCode.FAILURE, "No brand found", ""));
                return;
            }
            brand.brandName = brandName;
            brand.globalIdentifier = globalIdentifier;
            Brand.find({
                $or: [{
                    brandName: brandName
                }, {
                    globalIdentifier: globalIdentifier
                }]
            }, (err, check) => {
                if (check != "") {
                    res.json(responseBuilder(returnCode.FAILURE, "Name and globalIdentifier exited!", ""));
                    return;
                } else {
                    brand.save().then(() => {
                        res.json(responseBuilder(returnCode.SUCCESS, "Update brand success", ""));
                        return;
                    }).catch(err => {
                        res.json(responseBuilder(returnCode.FAILURE, "Mongo response error2", ""));
                        return;
                    })
                }
            })
        }
        return;
    });
})
module.exports = router;