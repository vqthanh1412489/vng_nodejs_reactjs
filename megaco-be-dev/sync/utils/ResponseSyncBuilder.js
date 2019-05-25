module.exports = {
    buildResponse: (returnCode, returnMessage, payload) => {
        return {
            returnCode,
            returnMessage,
            ...payload
        }
    }
}