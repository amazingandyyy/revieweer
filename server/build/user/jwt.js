'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jwtSimple = require('jwt-simple');

var _jwtSimple2 = _interopRequireDefault(_jwtSimple);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var JWT = {
    generateToken: function generateToken(user) {
        var createdAt = Math.round(Date.now() / 1000);
        var expiredAt = Math.round(Date.now() / 1000 + 7 * 60 * 60 * 24); // in 7 days
        var payload = {
            sub: user.id,
            iat: createdAt,
            exp: expiredAt
        };
        return _jwtSimple2.default.encode(payload, _config2.default.jwt_secret);
    },
    generateTokenWithEmail: function generateTokenWithEmail(email) {
        var createdAt = Math.round(Date.now() / 1000);
        var expiredAt = Math.round(Date.now() / 1000 + 1 * 60 * 60 * 2); // in 2 hours
        var payload = {
            sub: email,
            iat: createdAt,
            exp: expiredAt
        };
        return _jwtSimple2.default.encode(payload, _config2.default.jwt_secret_email);
    },
    verifyToken: function verifyToken(token, cb) {
        var decode = _jwtSimple2.default.decode(token, _config2.default.jwt_secret);
        if (!decode) return cb(new Error('Token is not verified.'));
        cb(null, decode);
    },
    verifyEmailToken: function verifyEmailToken(token, cb) {
        var decode = _jwtSimple2.default.decode(token, _config2.default.jwt_secret_email);
        if (!decode) return cb(new Error('Token is not verified.'));
        cb(null, decode.sub);
    }
};

exports.default = JWT;
//# sourceMappingURL=jwt.js.map