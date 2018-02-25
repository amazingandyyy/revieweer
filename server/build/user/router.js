'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _controller = require('./controller');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = require('express').Router();

router.get('/', function (req, res) {
  return res.json({ "message": "/api connected" });
});

router.get('/profile', function (req, res) {
  return res.send(req.user);
});
router.post('/profile', _controller2.default.updateProfile);

// router.use(`/admin`, Middleware.loginRequired, Middleware.adminReuired, admin);

exports.default = router;
//# sourceMappingURL=router.js.map