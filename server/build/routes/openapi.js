'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _product = require('../controllers/product');

var _product2 = _interopRequireDefault(_product);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = require('express').Router();

router.get('/', function (req, res) {
  return res.send({ 'message': '/openapi connected' });
});
router.get('/getOneFromAmazon', _product2.default.getOneFromAmazon);

exports.default = router;
//# sourceMappingURL=openapi.js.map