// External Dependencies
const router = require('express').Router();

// Internal Dependencies
const DefaultRoutes = require('../../config/DefaultRoutes');
const ShopCore = require('../../core/ShopCore');

const ResponseBuilder = require('../../utils/ResponseBuilder');
const RETURN_CODE = require('../../config/Enum').RETURN_CODE;
const USER_ROLE = require('../../config/Enum').ROLE;


/*
 *
 *   SECTION 3: Authentication
 *
 */

router.post(DefaultRoutes.SHOP.GET_ALL, (req, res, next) => {
    const userId = req.body.userId;

    if (!userId) {
        return res.status(400).json(ResponseBuilder.buildReponse(
            RETURN_CODE.FAILURE,
            `userId is missing`
        ));
    }
    if (typeof userId !== 'string') {
        return res.status(400).json(ResponseBuilder.buildReponse(
            RETURN_CODE.FAILURE,
            `userId data type is invalid`
        ));
    }

    ShopCore.getAllShops({
            userId
        })
        .then(shops => {
            if (!shops) {
                return res.status(403).json(ResponseBuilder.buildReponse(
                    RETURN_CODE.FAILURE,
                    'Shops not found'
                ));
            }

            return res.json(ResponseBuilder.buildReponse(
                RETURN_CODE.SUCCESS,
                'Shops found!', {
                    shops
                }
            ));
        })
        .catch(err => {
            return res.json(ResponseBuilder.buildReponse(
                RETURN_CODE.FAILURE,
                err
            ));
        });
});

router.post(DefaultRoutes.SHOP.INFO, (req, res, next) => {
    const shopId = req.body.shopId;

    if (!shopId) {
        return res.status(400).json(ResponseBuilder.buildReponse(
            RETURN_CODE.FAILURE,
            `shopId is missing`
        ));
    }
    if (typeof shopId !== 'string') {
        return res.status(400).json(ResponseBuilder.buildReponse(
            RETURN_CODE.FAILURE,
            `shopId data type is invalid`
        ));
    }

    ShopCore.getShopInfo({
            shopId
        })
        .then(shop => {
            if (!shop) {
                return res.status(403).json(ResponseBuilder.buildReponse(
                    RETURN_CODE.FAILURE,
                    'Shop not found'
                ));
            }

            return res.json(ResponseBuilder.buildReponse(
                RETURN_CODE.SUCCESS,
                'Shop found!', {
                    shopName: shop.shopName
                }
            ));
        })
        .catch(err => {
            return res.json(ResponseBuilder.buildReponse(
                RETURN_CODE.FAILURE,
                err
            ));
        });
});

// 2.1. Create
router.post(DefaultRoutes.SHOP.CREATE, (req, res, next) => {
    const userId = req.body.userId;
    const shopName = req.body.shopName;

    if (!userId || !shopName) {
        return res.status(400).json(ResponseBuilder.buildReponse(
            RETURN_CODE.FAILURE,
            `${(!userId && 'userId') || (!shopName && 'shopName')} is missing`
        ));
    }
    if (typeof userId !== 'string' ||
        typeof shopName !== 'string') {

        return res.status(400).json(ResponseBuilder.buildReponse(
            RETURN_CODE.FAILURE,
            `input data type is invalid`
        ));
    }

    ShopCore.createShop({
            userId,
            shopName
        })
        .then(isCreated => {
            if (!isCreated) {
                return res.status(403).json(ResponseBuilder.buildReponse(
                    RETURN_CODE.FAILURE,
                    'Can not create shop'
                ));
            }

            return res.json(ResponseBuilder.buildReponse(
                RETURN_CODE.SUCCESS,
                'Shop is created successfully'
            ));
        })
        .catch(err => {
            return res.json(ResponseBuilder.buildReponse(
                RETURN_CODE.FAILURE,
                err
            ));
        });
});

router.post(DefaultRoutes.SHOP.UPDATE, (req, res, next) => {
    const userId = req.body.userId;
    const shopId = req.body.shopId;
    const shopName = req.body.shopName;

    if (!userId || !shopName || !shopId) {
        return res.status(400).json(ResponseBuilder.buildReponse(
            RETURN_CODE.FAILURE,
            `${(!userId && 'userId') || (!shopName && 'shopName')|| (!shopId && 'shopId')} is missing`
        ));
    }
    if (typeof userId !== 'string' ||
        typeof shopId !== 'string' ||
        typeof shopName !== 'string') {

        return res.status(400).json(ResponseBuilder.buildReponse(
            RETURN_CODE.FAILURE,
            `input data type is invalid`
        ));
    }

    ShopCore.updateShop({
            userId,
            shopId,
            shopName
        })
        .then(isUpdated => {
            if (!isUpdated) {
                return res.status(403).json(ResponseBuilder.buildReponse(
                    RETURN_CODE.FAILURE,
                    'Can not update shop'
                ));
            }

            return res.json(ResponseBuilder.buildReponse(
                RETURN_CODE.SUCCESS,
                'Shop is updated successfully'
            ));
        })
        .catch(err => {
            return res.json(ResponseBuilder.buildReponse(
                RETURN_CODE.FAILURE,
                err
            ));
        });
});

module.exports = router;