'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _authenticator = require('../controllers/authenticator');

var _authenticator2 = _interopRequireDefault(_authenticator);

var _middlewares = require('./middlewares');

var _middlewares2 = _interopRequireDefault(_middlewares);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import openapi from './openapi';

var router = require('express').Router();
router.get('/', function (req, res) {
  return res.send({ message: 'connect to server.revieweer.com', webhook: 'https://server.revieweer.com/webhook', openapi: 'https://server.revieweer.com/openapi', api: 'https://server.revieweer.com/api' });
});
router.get('/webhook', function (req, res) {
  return res.send({ connection: true, timestamp: new Date().toUTCString() });
});
router.use('/api', _middlewares2.default.loginRequired, _api2.default);
router.post('/signupWithEmail', _authenticator2.default.signupWithEmail);
router.post('/verifyEmailToken', _authenticator2.default.verifyEmailToken);
router.post('/signup/:token', _authenticator2.default.signup);
router.post('/signin', _authenticator2.default.signin);
// router.use('/openapi', openapi);

exports.default = router;
//# sourceMappingURL=index.js.map