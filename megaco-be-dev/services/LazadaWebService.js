// External dependencies
const axios = require('axios');

module.exports = {
    // Common API
    syncData: (req) => {
        const requestURL = 'https://jsonplaceholder.typicode.com/todos/13';
        // const requestURL = 'sfsdf';

        return new Promise((resolve, reject) => {
            // Modify request
            req.data = 'eShop request'
            console.log(`eShop request: ${JSON.stringify(req)}`);

            axios.get(requestURL).then(res => {
                console.log(`eShop response: ${JSON.stringify(res.data)}`);

                // Modify response
                const convertedResponse = {
                    status: {
                        returnCode: 1,
                        returnMessage: 'Success',
                        dataSource: 'LAZADA'
                    },
                    payload: res.data
                }

                resolve(convertedResponse);
            }).catch(exc => {
                reject({
                    status: {
                        returnCode: 0,
                        returnMessge: ''
                    },
                    payload: null
                })
            });

        });
    }
}
