'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (process.env.NODE_ENV != 'production') {
  _dotenv2.default.config({ path: _path2.default.resolve(__dirname, '.env') });
}

exports.default = {
  jwt_secret: process.env.JWT_SECRET || 'jwt_secret_FJLK:',
  jwt_secret_email: process.env.JWT_SECRET_EMAIL || 'jwt_secret_email',
  URIDomain: process.env.NODE_ENV == 'production' ? 'https://www.revieweer.com/' : 'localhost:8080/',
  mongoose: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost/revieweer'
  },
  AmzSecretKey: process.env.AmzSecretKey || '',
  AWSAccessKeyId: process.env.AWSAccessKeyId || '',
  sentryDSN: process.env.SentryDSN || '',
  admin: {
    passcode: process.env.adminKey,
    list: ['amazingandyyy@gmail.com']
  },
  aws: {
    accessKeyId: process.env.AWSAccessKeyId,
    secretKey: process.env.AWSSecretKey
  },
  apifyToken: {
    itemLookUp: process.env.apifyToken_itemLookUp
  }
};
//# sourceMappingURL=config.js.map