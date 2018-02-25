'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _controller = require('./controller');

var _controller2 = _interopRequireDefault(_controller);

var _middlewares = require('../middlewares');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = require('express').Router();

router.get('/', function (req, res) {
  return res.json({ "message": "/api/product connected" });
});

router.get('/searchAmazonByProductId', _middlewares.adminReuired, _controller2.default.searchAmazonByProductId);
router.post('/createOne', _middlewares.adminReuired, _controller2.default.createOne);
// router.get('/getOneById', Controller.getOneById); //req.query.productId
router.get('/getOneByProductId', _controller2.default.getOneByProductId); //req.query.productId
router.get('/endOneById', _middlewares.adminReuired, _controller2.default.endOneById); //req.query.id
router.post('/updateOneById', _middlewares.adminReuired, _controller2.default.updateOneById); //req.query.id
router.delete('/deleteOneById', _middlewares.adminReuired, _controller2.default.deleteOneById); //req.query.id
router.put('/deleteOneById', _middlewares.adminReuired, _controller2.default.deleteOneById); //req.query.id
router.put('/activeOneById', _middlewares.adminReuired, _controller2.default.activeOneById); //req.query.id
router.get('/fetchProductPreview', _controller2.default.fetchProductPreview); //req.query.productId

router.get('/fetchAll', _controller2.default.fetchAll);

exports.default = router;
//# sourceMappingURL=router.js.map