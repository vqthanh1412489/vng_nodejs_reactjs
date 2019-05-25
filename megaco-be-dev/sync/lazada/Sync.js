const Converter = require('./RestConverter');
const buildResponse = require('../utils/ResponseSyncBuilder').buildResponse;
const RETURN_CODE = require('../ReturnCode');
const Product = require('../../models/Product');
const InvokeAPI = require('./InvokeAPI');
const asyncDelay = require('./helpers/Helpers').asyncDelay;

module.exports = {
    createProductSync: async (productId, shopId) => {
        const foundProduct = await Product.findOne({
            _id: productId
        });

        const accessToken =
            '50000500a30Moi7jFs1vphbdg2gJsgzqCYCdp8mUtg10911367mDvHVFgl9ByL';

        const { batchId } = await InvokeAPI.migrateImages(
            foundProduct.images,
            accessToken
        );

        let imageUrls;
        while (!imageUrls) {
            let urls = (await InvokeAPI.getResponse(batchId, accessToken))
                .images;
            if (urls) {
                imageUrls = urls;
                break;
            }
            await asyncDelay(1000);
        }

        const createdProductId = (await InvokeAPI.createProduct(
            foundProduct,
            accessToken
        )).productId;

        return buildResponse(
            RETURN_CODE.SUCCESS,
            'Product is created successfully',
            {
                productId: createdProductId
            }
        );
    }
};
