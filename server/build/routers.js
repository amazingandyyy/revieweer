'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _controller = require('./user/controller');

var _controller2 = _interopRequireDefault(_controller);

var _middlewares = require('./middlewares');

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _router = require('./apify/router');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = require('express').Router();
router.get('/', function (req, res) {
  return res.send({ message: 'connect to server.revieweer.com', webhook: 'https://server.revieweer.com/webhook', openapi: 'https://server.revieweer.com/openapi', api: 'https://server.revieweer.com/api' });
});
router.get('/webhook', function (req, res) {
  return res.send({ connection: true, timestamp: new Date().toUTCString() });
});

router.post('/signupWithEmail', _controller2.default.signupWithEmail);
router.post('/verifyEmailToken', _controller2.default.verifyEmailToken);
router.post('/signup/:token', _controller2.default.signup);
router.post('/signin', _controller2.default.signin);

router.use('/api', _middlewares.loginRequired, _api2.default);

router.use('/apify', _middlewares.apifyRequired, _router2.default);

exports.default = router;
//# sourceMappingURL=routers.js.map