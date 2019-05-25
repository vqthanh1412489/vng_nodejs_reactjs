const jwt = require('jsonwebtoken');

const JWTConfig = require('../config/JWTConfig');

module.exports = {
    generateToken: async (payload) => {
        return await jwt.sign(
            { ...payload },
            JWTConfig.SECRET_KEY,
            {
                algorithm: JWTConfig.ALGORITHM,
                expiresIn: JWTConfig.EXPIRE_TIME
            }
        );
    },

    validateToken: (token) => {
        try {
            jwt.verify(
                token,
                JWTConfig.SECRET_KEY,
                {
                    algorithms: JWTConfig.ALGORITHM
                }
            );

        } catch (exc) {
            return false;
        }

        return true;
    },

    getRole: (token) => {
        try {
            const decoded = jwt.decode(token, {complete: true});
            return decoded.payload.permission;
        } catch (exc) {
            return null;
        }
    }
}