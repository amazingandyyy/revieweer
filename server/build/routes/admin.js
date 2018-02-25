'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var router = require('express').Router();

router.get('/', function (req, res, next) {
  res.send({
    'message': '/api/admin connected'
  });
});

exports.default = router;
//# sourceMappingURL=admin.js.map