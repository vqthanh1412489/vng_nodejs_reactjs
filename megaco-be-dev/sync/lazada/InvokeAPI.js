// Access eShop API
const axios = require('axios');
const qs = require('querystring');
const js2xml = require('js2xmlparser');

const ROUTES = require('./config/Routes');
const RETURN_CODE = require('../ReturnCode');
const { getAllParams } = require('./helpers/Helpers');
const { buildResponse } = require('../utils/ResponseSyncBuilder');

module.exports = {
    /*
     *    SECTION 1: Product Management
     */

    // 1.1 Create Product
    createProduct: async (product, accessToken) => {
        const REQUEST_URL = ROUTES.ROOT + ROUTES.CREATE_PRODUCT;

        // API Invocation
        let randomSKU = '';
        for (i = 0; i < Math.floor(Math.random() * 10) + 3; i++) {
            randomSKU += String.fromCharCode(
                Math.floor(Math.random() * 20) + 65
            );
        }
        const xmlPayload = `<?xml version="1.0" encoding="UTF-8" ?>
        <Request>
            <Product>
                <PrimaryCategory>14267</PrimaryCategory>
                <SPUId></SPUId>
                <AssociatedSku></AssociatedSku>
                <Attributes>
                    <name>api create product test sample</name>
                    <short_description>This is a nice product</short_description>
                    <brand>Remark</brand>
                    <model>asdf</model>
                   <color_family>Aqua</color_family>
                </Attributes>
                <Skus>
                    <Sku>
                        <SellerSku>${randomSKU}</SellerSku>
                        <color_family>Green</color_family>
                        <size>40</size>
                        <quantity>1</quantity>
                        <price>38008</price>
                        <package_length>11</package_length>
                        <package_height>22</package_height>
                        <package_weight>33</package_weight>
                        <package_width>44</package_width>
                        <package_content>this is what's in the box</package_content>
                        <Images>
                            <Image>https://vn-live-02.slatic.net/p/36b2252891399263c1de8502caf2c2f6.jpg</Image>
                        </Images>
                    </Sku>
                </Skus>
            </Product>
        </Request>
        `;

        const { data } = await axios.post(
            REQUEST_URL,
            qs.stringify(
                getAllParams(ROUTES.CREATE_PRODUCT, accessToken, {
                    payload: xmlPayload
                })
            )
        );

        // Response Processing
        if (data.code === '0') {
            // Successful invocation
            const { item_id } = data;
            return buildResponse(RETURN_CODE.SUCCESS, '', {
                productId: item_id
            });
        } else {
            // Failed invocation
            throw buildResponse(RETURN_CODE.FAILURE, data.message);
        }
    },

    getResponse: async (batchId, accessToken) => {
        const REQUEST_URL = ROUTES.ROOT + ROUTES.GET_RESPONSE;

        // API Invocation
        const requestParams = {
            batch_id: batchId
        };

        const { data } = await axios.get(REQUEST_URL, {
            params: getAllParams(
                ROUTES.GET_RESPONSE,
                accessToken,
                requestParams
            )
        });

        // Response Processing
        if (data.code === '0') {
            // Successful invocation
            const images = data.data.images.map(img => img.url);
            return buildResponse(RETURN_CODE.SUCCESS, '', {
                images
            });
        } else {
            // Failed invocation
            throw buildResponse(RETURN_CODE.FAILURE, data.message);
        }
    },

    migrateImages: async (imageURLs, accessToken) => {
        const REQUEST_URL = ROUTES.ROOT + ROUTES.MIGRATE_IMAGES;

        // API Invocation
        const requestParams = {
            Images: {
                Url: []
            }
        };
        imageURLs.forEach(imageURL => {
            requestParams.Images.Url.push({
                '#': imageURL
            });
        });

        const xmlPayload = js2xml.parse('Request', requestParams, {
            declaration: {
                encoding: 'utf-8'
            }
        });

        const { data } = await axios.post(
            REQUEST_URL,
            qs.stringify(
                getAllParams(ROUTES.MIGRATE_IMAGES, accessToken, {
                    payload: xmlPayload
                })
            )
        );

        // Response Processing
        if (data.code === '0') {
            // Successful invocation
            const batchId = data.batch_id;
            return buildResponse(RETURN_CODE.SUCCESS, '', {
                batchId
            });
        } else {
            // Failed invocation
            throw buildResponse(RETURN_CODE.FAILURE, data.message);
        }
    },

    // 1.2 Get ONE Product
    getOneProduct: () => {},

    // 1.3 Get ALL Product
    getAllProducts: () => {},

    // 1.4 Update ONE Product
    updateOneProduct: () => {},

    // 1.5 Remove ONE Product
    updateOneProduct: () => {},

    /*
     *    SECTION 2: Category Management
     */

    // 2.1 Convert Category Id
    convertCategoryId: () => {},

    /*
     *    SECTION 3: Attribute Management
     */

    // 2.1 Convert Attributes
    convertAttributes: () => {}
};
