// External Dependencies
const router = require('express').Router();

// Internal Dependencies
const SyncRoutes = require('../../config/SyncRoutes');
const Product = require('../../models/Product');
const ResponseBuilder = require('../../utils/ResponseBuilder');
const RETURN_CODE = require('../../config/Enum').RETURN_CODE;
const Sync = require('../../sync/lazada/Sync');

// Routing
router.all(SyncRoutes.PRODUCT.ADD, (req, res) => {
    const productId = req.body.productId;

    if (!productId) {
        return res.json(ResponseBuilder.buildReponse(RETURN_CODE.FAILURE, 'productId is invalid'));
    }

    Sync.createProductSync(productId).then(r => {
        return res.json(r);
    }).catch(err => {
        return res.json(ResponseBuilder.buildReponse(RETURN_CODE.FAILURE, err.returnMessage || err.toString()));
    });
});

module.exports = router;