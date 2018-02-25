'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _controller = require('./controller');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = require('express').Router();

router.get('/', function (req, res) {
  return res.json({ "message": "/api/case connected" });
});

router.get('/startOne', _controller2.default.startOne); // req.query.type
router.get('/fetchOne', _controller2.default.fetchOne);
// router.post('/fetchOneCase', Controller.updateOne);

// router.get('/fetchAll', adminReuired, Controller.fetchAll);

exports.default = router;
//# sourceMappingURL=router.js.map