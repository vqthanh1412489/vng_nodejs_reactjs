// TODO: Discuss this object structure

module.exports = {
    BASE_URL: '/api/v1',
    AUTHENTICATION: {
        ROOT: '/auth',
        LOGIN: '/login',
        REGISTER: '/register',
        RESET_PASSWORD: '/resetPassword',
        DEMO_LOGIN: '/demologin',
        DEMO_USER: '/demouser'
    },
    PRODUCT: {
        ROOT: '/product',
        DEMO_GET_INFO: '/info',
        GET_ALL: '/all',
        GET_ONE: '/one',
        ADD: '/create',
        REMOVE: '/remove',
        UPDATE: '/update',
    },
    CATEGORY:{
        ROOT:'/category',
        GET_TREE: '/tree',
        GET_ATTRIBUTE: '/attribute',
        ADD:'/create'
    },
    BRAND:{
        ROOT:'/brand',
        GET_ALL:'/all',
        ADD: '/create',
        GET_ONE:'/one',
        UPDATE: '/update'
    },

    LOGISTIC:{
        ROOT: '/logistic',
        GET_ALL: '/all',
        GET_ONE:'/one',
        ADD: '/create',
        UPDATE:'/update',
        DELETE:'/remove'
    },

    WARRANTY:{
        ROOT:'/warranty',
        GET_ALL:'/all',
        GET_ONE:'/one',
        ADD: '/create',
        UPDATE: '/update',
        DELETE: '/remove'

    },

    SHOP:{
        ROOT:'/shop',
        GET_ALL:'/all',
        GET_ONE:'/one',
        CREATE: '/create',
        UPDATE: '/update',
        INFO: '/info'
        
    }
    
}
