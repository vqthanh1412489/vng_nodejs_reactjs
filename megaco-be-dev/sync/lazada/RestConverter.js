module.exports = {
    createProduct: {
        request: dbProduct => {
            return {
                type: 'Request in Lazada format'
            };
        },

        response: lazadaResponse => {
            return {
                type: 'Response in Megaco format'
            };
        }
    }
};
