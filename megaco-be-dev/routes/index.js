// External Dependencies
const router = require('express').Router();

// Internal Dependencies
const DefaultRoutes = require('../config/DefaultRoutes');
const SyncRoutes = require('../config/SyncRoutes');
const AuthAPI = require('./api/AuthAPI');
const ProductAPI = require('./api/ProductAPI');
const BrandAPI = require('./api/BrandAPI');
const CategoryAPI = require('./api/CategoryAPI');
const ShopAPI = require('./api/ShopAPI');
const AuthMiddleware = require('./middleware/AuthMiddleware');
const HeaderModMiddleware = require('./middleware/HeaderModMiddleware');
const LogisticAPI = require('./api/LogisticAPI');
const WarrantyAPI = require('./api/WarrantyAPI');

// Synchronization API
const ProductSyncAPI = require('./sync-api/ProductSyncAPI');

// Middlewares
router.use(AuthMiddleware);
router.use(HeaderModMiddleware);

// APIs
router.use(DefaultRoutes.AUTHENTICATION.ROOT, AuthAPI);
router.use(DefaultRoutes.PRODUCT.ROOT, ProductAPI);
router.use(DefaultRoutes.BRAND.ROOT, BrandAPI);
router.use(DefaultRoutes.CATEGORY.ROOT, CategoryAPI);
router.use(DefaultRoutes.SHOP.ROOT, ShopAPI);
router.use(DefaultRoutes.LOGISTIC.ROOT, LogisticAPI);
router.use(DefaultRoutes.WARRANTY.ROOT, WarrantyAPI);

router.use(SyncRoutes.PRODUCT.ROOT, ProductSyncAPI);

module.exports = router;