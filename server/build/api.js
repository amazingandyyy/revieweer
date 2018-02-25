'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _router = require('./user/router');

var _router2 = _interopRequireDefault(_router);

var _router3 = require('./product/router');

var _router4 = _interopRequireDefault(_router3);

var _router5 = require('./case/router');

var _router6 = _interopRequireDefault(_router5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import admin from './admin';
// import Middleware from './middlewares';

var router = require('express').Router();

router.get('/', function (req, res) {
  return res.json({ "message": "/api connected" });
});

router.use('/user', _router2.default);
router.use('/product', _router4.default);
router.use('/case', _router6.default);

// router.use(`/admin`, Middleware.loginRequired, Middleware.adminReuired, admin);

exports.default = router;
//# sourceMappingURL=api.js.map