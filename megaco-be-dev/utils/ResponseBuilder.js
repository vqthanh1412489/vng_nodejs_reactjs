module.exports = {
    buildReponse: (returnCode, message, payload) => {
        return Object.assign({}, {
            returnCode,
            message,
            ...payload
        });
    },

    buildInternalResponse: (returnCode, message, payload) => {
        return Object.assign({}, {
            returnCode,
            message,
            ...payload
        });
    }
}