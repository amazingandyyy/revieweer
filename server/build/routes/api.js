'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _authenticator = require('../controllers/authenticator');

var _authenticator2 = _interopRequireDefault(_authenticator);

var _admin = require('./admin');

var _admin2 = _interopRequireDefault(_admin);

var _product = require('./product');

var _product2 = _interopRequireDefault(_product);

var _middlewares = require('./middlewares');

var _middlewares2 = _interopRequireDefault(_middlewares);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = require('express').Router();

router.get('/', function (req, res) {
  return res.send({ 'message': '/api connected' });
});

router.get('/userProfile', function (req, res) {
  return res.send(req.user);
});
router.post('/userProfile', _authenticator2.default.updateProfile);

router.use('/product', _product2.default);

router.use('/admin', _middlewares2.default.loginRequired, _middlewares2.default.adminReuired, _admin2.default);

exports.default = router;
//# sourceMappingURL=api.js.map