const Route = require('./DefaultRoutes');
const Enum = require('../config/Enum');

module.exports = {
    [Route.AUTHENTICATION.ROOT + Route.AUTHENTICATION.LOGIN]: [Enum.ROLE.VISITOR],
}
