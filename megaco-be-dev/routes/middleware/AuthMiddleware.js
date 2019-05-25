const AuthService = require('../../services/AuthService');

const Enum = require('../../config/Enum');
const ACL = require('../../config/ACL');

const ResponseBuilder = require('../../utils/ResponseBuilder');

module.exports = (req, res, next) => {
    const currentPath = req.url.substring(0, (req.url.indexOf('?') > -1 ? req.url.indexOf('?') : undefined));
    const requiredRoles = ACL[currentPath];

    if (!requiredRoles || requiredRoles.indexOf(Enum.ROLE.VISITOR) > -1) {
        return next();
    } else {
        const token = req.get('Authorization');
        if (!token || !AuthService.validateToken(token)) {
            return res.status(403).json(ResponseBuilder.buildReponse(
                0,
                `you don't have permission to access this site`
            ));
        }

        const tokenRole = AuthService.getRole(token);
        if ((requiredRoles.indexOf(Enum.ROLE.USER) > -1 && tokenRole !== Enum.ROLE.USER)
            && (requiredRoles.indexOf(Enum.ROLE.ADMIN) > -1 && tokenRole !== Enum.ROLE.ADMIN)) {
            return res.status(403).json(ResponseBuilder.buildReponse(
                0,
                `you don't have permission to access this site`
            ));
        }
    }

    next();
}
