'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _product = require('../controllers/product');

var _product2 = _interopRequireDefault(_product);

var _admin = require('./admin');

var _admin2 = _interopRequireDefault(_admin);

var _middlewares = require('./middlewares');

var _middlewares2 = _interopRequireDefault(_middlewares);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = require('express').Router();

router.get('/', function (req, res) {
  return res.send({ 'message': '/api/product connected' });
});

router.post('/createFromAmazonSource', _product2.default.createFromAmazonSource);
router.get('/getOneFromAmazon', _product2.default.getOneFromAmazon);
router.get('/getOneFromRevieweer', _product2.default.getOneFromRevieweer);

router.use('/admin', _middlewares2.default.loginRequired, _middlewares2.default.adminReuired, _admin2.default);

exports.default = router;
//# sourceMappingURL=product.js.map