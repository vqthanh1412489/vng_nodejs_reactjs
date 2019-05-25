const cryptojs = require("crypto-js");
const hexFormat = require("crypto-js/enc-hex");
const moment = require("moment");

const { SECRET_KEY, APP_KEY, SIGN_METHOD } = require("../config/Constants");

const getSignature = (apiURL, requestBody) => {
    let query = "";
    let keys = Object.keys(requestBody);

    keys = keys.sort();

    keys.forEach(key => {
        if (!(Array.isArray(requestBody[key]) || key === "sign")) {
            query += `${key}${requestBody[key]}`;
        }
    });

    query = apiURL + query;
    return hexFormat
        .stringify(cryptojs.HmacSHA256(query, SECRET_KEY))
        .toUpperCase();
};

const getAllParams = (apiURL, accessToken, peculiarParams) => {
    const params = {
        ...peculiarParams,
        app_key: APP_KEY,
        timestamp: moment()
            .valueOf()
            .toString(),
        access_token: accessToken,
        sign_method: SIGN_METHOD
    };

    params.sign = getSignature(apiURL, params);

    return params;
};

const asyncDelay = async ms => {
    return await new Promise(resolve => setTimeout(resolve, ms));
};

module.exports = {
    getSignature,
    getAllParams,
    asyncDelay
};
