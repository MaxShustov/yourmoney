var extractJwt = require("passport-jwt").ExtractJwt;

var jwtOptions = {
    jwtFromRequest: extractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: process.env.jwtSecretKey || 'jwtSecretKey'
};

module.exports = jwtOptions;