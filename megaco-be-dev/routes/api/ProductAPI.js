// External Dependencies
const router = require('express').Router();

// Internal Dependencies
const ProductCore = require('../../core/ProductCore');
const DefaultRoutes = require('../../config/DefaultRoutes');
const Product = require('../../models/Product');
const ResponseBuilder = require('../../utils/ResponseBuilder');
const RETURN_CODE = require('../../config/Enum').RETURN_CODE;
const USER_ROLE = require('../../config/Enum').ROLE;

// Routing
router.get(DefaultRoutes.PRODUCT.DEMO_GET_INFO, (_req, res) => {
    console.log(_req.extraData);
    // DEMO
    const product = {
        productName: 'Macbook Pro',
        price: 100
    };

    product.price = Helper.withCurrency(product.price);

    res.send(JSON.stringify(product));
});

// Get ONE
router.post(DefaultRoutes.PRODUCT.GET_ONE, (req, res) => {
    const data = req.body;
    const productId = data.productId;
    // console.log(productId);
    Product.findOne({
        _id: productId
    }, function (err, product) {
        if (err) {
            return res.status(500).json(ResponseBuilder.buildReponse(
                RETURN_CODE.FAILURE,
                'Mongo response error!'
            ));
        } else {
            return res.status(200).json(ResponseBuilder.buildReponse(
                RETURN_CODE.SUCCESS,
                'success!',
                {
                    "product": product
                }
            ));
        }
    });
});

// Post Add product
router.post(DefaultRoutes.PRODUCT.ADD, (req, res) => {
    const data = req.body;

    // check categiryId
    ProductCore.checkCategory(data.categoryId).then(result => {
        if (result != true)
            return res.status(400).json(ResponseBuilder.buildReponse(
                RETURN_CODE.FAILURE,
                'categotyId not found!'));
    });
    //check Sku
    ProductCore.checkSKU(data.sku).then(result => {
        if (result != true)
            return res.status(400).json(ResponseBuilder.buildReponse(
                RETURN_CODE.FAILURE,
                'SKU exited!'
            ));
    });

    // // check Brand
    ProductCore.checkBrand(data.brandId).then(result => {
        if (result != true)
            return res.status(400).json(ResponseBuilder.buildReponse(
                RETURN_CODE.FAILURE,
                'brandId not found!'
            ));
    });

    // // check Logistic
    ProductCore.checkLogistic(data.logisticsId).then(result => {
        if (result != true)
            return res.status(400).json(ResponseBuilder.buildReponse(
                RETURN_CODE.FAILURE,
                'logisticId not found!'
            ));
    });

    // // check exited
    ProductCore.checkExited(data.productName).then(result => {
        if (result != true)
            return res.status(400).json(ResponseBuilder.buildReponse(
                RETURN_CODE.FAILURE,
                'product name exited!'
            ));
    })

    if (typeof limit !== 'number' ||
        typeof offset !== 'number' ||
        typeof shopId !== 'string' ||
        (keyword && typeof keyword !== 'string') ||
        (category.categoryId && typeof category.categoryId !== 'string') ||
        (category.categoryName && typeof category.categoryName !== 'string') ||
        (logicticsId && typeof logicticsId !== 'string') ||
        (warrantyId && typeof warrantyId !== 'string') ||
        (brand.brandId && typeof brand.brandId !== 'string') ||
        (brand.brandName && typeof brand.brandName !== 'string') ||
        (price && typeof price !== 'object' && (!price.from || !price.to)) ||
        (stock && typeof stock !== 'object' && (!stock.from || !stock.to)) ||
        (weight && typeof weight !== 'object' && (!weight.from || !weight.to)))

    ProductCore.addProduct(
            data.shopId,
            data.category,
            data.logisticsId,
            data.warrantyId,
            data.brand,
            data.productName,
            data.price,
            data.sku,
            data.condition,
            data.model,
            data.specialPrice,
            data.stock,
            data.shortDescription,
            data.longDescription,
            data.variations,
            data.attributes,
            data.weight,
            data.images,
            data.packageInfo,
           
    ).then(result =>{
        if(result!= false){
            return res.status(200).json(ResponseBuilder.buildReponse(
                RETURN_CODE.SUCCESS, {
                    productId: result
                }
            ));
        } else {
            return res.status(200).json(ResponseBuilder.buildReponse(
                RETURN_CODE.FAILURE,
                'Some thing wrong!'
            ));
        }
    })



});

router.post(DefaultRoutes.PRODUCT.GET_ALL, (req, res) => {
    const limit = req.body.limit;
    const offset = req.body.offset;
    const shopId = req.body.shopId;

    const keyword = req.body.keyword;
    const categoryId = req.body.categoryId;
    const logicticsId = req.body.logicticsId;
    const warrantyId = req.body.warrantyId;
    const brandId = req.body.brandId;
    const price = req.body.price;
    const stock = req.body.stock;
    const weight = req.body.weight;

    if (limit === undefined || offset === undefined || !shopId) {
        return res.status(400).json(ResponseBuilder.buildReponse(
            RETURN_CODE.FAILURE,
            `${(limit === undefined && 'limit') 
            || (offset === undefined && 'offset')
            || (!shopId && 'shopId')}` +
            ' is missing'
        ));
    }
    if (typeof limit !== 'number' ||
        typeof offset !== 'number' ||
        typeof shopId !== 'string' ||
        (keyword && typeof keyword !== 'string') ||
        (categoryId && typeof categoryId !== 'string') ||
        (logicticsId && typeof logicticsId !== 'string') ||
        (warrantyId && typeof warrantyId !== 'string') ||
        (brandId && typeof brandId !== 'string') ||
        (price && typeof price !== 'object' && (!price.from || !price.to)) ||
        (stock && typeof stock !== 'object' && (!stock.from || !stock.to)) ||
        (weight && typeof weight !== 'object' && (!weight.from || !weight.to))) {

        return res.status(400).json(ResponseBuilder.buildReponse(
            RETURN_CODE.FAILURE,
            `input data type is invalid`
        ));
    }

    ProductCore.getAll({
        limit,
        offset,
        shopId,
        brandId,
        categoryId,
        logicticsId,
        warrantyId,
        keyword,
        price,
        stock,
        weight
    }).then(returnedData => {
        if (returnedData) {
            return res.json(ResponseBuilder.buildReponse(
                RETURN_CODE.SUCCESS,
                'Get products successfully', {
                    totalItems: returnedData.totalItems,
                    products: returnedData.products
                }
            ));
        } else {
            return res.json(ResponseBuilder.buildReponse(
                RETURN_CODE.FAILURE,
                "There's something wrong!"
            ));
        }
    }).catch(err => {
        if (err.kind === 'ObjectId' && err.name === 'CastError') {
            return res.json(ResponseBuilder.buildReponse(
                RETURN_CODE.FAILURE,
                `${err.path} is invalid`
            ));
        }

        return res.json(ResponseBuilder.buildReponse(
            RETURN_CODE.FAILURE,
            err.toString()
        ));
    });
});

router.post(DefaultRoutes.PRODUCT.REMOVE, (req, res) => {
    const productId = req.body.productId;

    if (productId === undefined) {
        return res.status(400).json(ResponseBuilder.buildReponse(
            RETURN_CODE.FAILURE,
            `${(!productId && 'productId')}` +
            ' is missing'
        ));
    }
    if (typeof productId !== 'string') {
        return res.status(400).json(ResponseBuilder.buildReponse(
            RETURN_CODE.FAILURE,
            `productId data type is invalid`
        ));
    }

    ProductCore.removeProduct({
        productId
    }).then(returnedData => {
        if (returnedData) {
            return res.json(ResponseBuilder.buildReponse(
                RETURN_CODE.SUCCESS,
                'Remove product successfully'
            ));
        } else {
            return res.json(ResponseBuilder.buildReponse(
                RETURN_CODE.FAILURE,
                "Can not remove product"
            ));
        }
    }).catch(err => {
        return res.json(ResponseBuilder.buildReponse(
            RETURN_CODE.FAILURE,
            err.toString()
        ));
    });
});


// Update product
router.post(DefaultRoutes.PRODUCT.UPDATE, (res, req)=>{

})

module.exports = router;