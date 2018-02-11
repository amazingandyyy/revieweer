import jwt from 'jwt-simple';

import config from '../config';

export default {
    generateToken: function (user) {
        const createdAt = Math.round(Date.now() / 1000);
        const expiredAt = Math.round(Date.now() / 1000 + 1 * 60 * 60); // in 1 hour
        const payload = {
            sub: user.id,
            iat: createdAt,
            exp: expiredAt
        }
        return jwt.encode(payload, config.jwt_secret);
    },
    generateTokenWithEmail: function (email) {
        const createdAt = Math.round(Date.now() / 1000);
        const expiredAt = Math.round(Date.now() / 1000 + 7 * 60 * 60 * 24); // in 7 days
        const payload = {
            sub: email,
            iat: createdAt,
            exp: expiredAt
        }
        return jwt.encode(payload, config.jwt_secret_email);
    },
    verifyToken: function (token, cb) {
        if(!token) {
            return cb(new Error('Token is needed'));
        }
        const decode = jwt.decode(token, config.jwt_secret)
        if (!decode) return cb(new Error('Token is not verified.'));
        cb(null, decode);
    },
    verifyEmailToken: function (token, cb) {
        console.log('EmailToken', token.toString());
        const decode = jwt.decode(token.toString(), config.jwt_secret_email)
        if (!decode) return cb(new Error('Token is not verified.'));
        cb(null, decode.sub);
    },
}