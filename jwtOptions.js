var extractJwt = require("passport-jwt").ExtractJwt;

var jwtOptions = {
    jwtFromRequest: extractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: 'supersecretword'
};

module.exports = jwtOptions;