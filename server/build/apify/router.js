'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _controller = require('./controller');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = require('express').Router();

router.get('/', function (req, res) {
  return res.json({ "message": "/api/product connected" });
});

// POST- https://server.revieweer.com/apify/webhook/createOneProduct
router.post('/webhook/createOneProduct', _controller2.default.createOneProduct);

exports.default = router;
//# sourceMappingURL=router.js.map