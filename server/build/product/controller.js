'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

var _itemLookUp = require('./itemLookUp');

var _itemLookUp2 = _interopRequireDefault(_itemLookUp);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  searchAmazonByProductId: function searchAmazonByProductId(req, res, next) {
    var productId = req.query.productId;

    if (!productId) return next('403:productId is required');
    (0, _itemLookUp2.default)(productId, function (err, p) {
      if (err) return next;
      res.send(p);
    });
  },
  createOne: function createOne(req, res, next) {
    var obj = req.body;
    if (!obj) return next('500:No Product Details');
    var cleanUpObj = {
      details: {
        imageURL: obj.imageURL,
        title: obj.title,
        link: obj.link,
        price: obj.price,
        seller: obj.seller
      },
      benefits: {
        cashback: obj.cashback,
        notes: obj.notes || '',
        rewards: obj.rewards
      },
      productId: obj.productId
    };
    _model2.default.findOneByProductId(obj.productId).then(function (p) {
      if (p) {
        return res.send({
          message: 'Existing',
          productId: p.productId
        });
      }
      var product = new _model2.default(cleanUpObj);
      product.save().then(function (p) {
        return res.send({
          message: 'New',
          productId: p.productId
        });
      });
    }).catch(next);
  },
  getOneByProductId: function getOneByProductId(req, res, next) {
    var productId = req.query.productId;

    if (!productId) next('404:No Product Id');
    productId ? _model2.default.findOneByProductId(productId).then(function (p) {
      return res.send(p);
    }).catch(next) : next('404:No Product Id');
  },
  endOneById: function endOneById(req, res, next) {
    var id = req.query.id;

    id ? _model2.default.findByIdAndUpdate(id, { end: true }).then(function (_) {
      return res.send();
    }).catch(next) : next('404:No Id');
  },
  updateOneById: function updateOneById(req, res, next) {
    var id = req.query.id;

    var obj = req.body;
    id ? _model2.default.findByIdAndUpdate(id, { $set: dotNotate(obj) }).then(function (_) {
      return res.send();
    }).catch(next) : next('404:No Id');
  },
  activeOneById: function activeOneById(req, res, next) {
    var id = req.query.id;

    id ? _model2.default.findByIdAndUpdate(id, { end: false }).then(function (_) {
      return res.send();
    }).catch(next) : next('404:No Id');
  },
  deleteOneById: function deleteOneById(req, res, next) {
    var id = req.query.id;

    id ? _model2.default.findByIdAndRemove(id).then(function (_) {
      return res.send();
    }).catch(next) : next('404:No Id');
  },
  fetchProductPreview: function fetchProductPreview(req, res, next) {
    var productPendingId = req.query.productPendingId;

    console.log(productPendingId);
    _axios2.default.get('https://api.apify.com/v1/execs/' + productPendingId + '/results').then(function (p) {
      return res.send(p.data[0].pageFunctionResult);
    }).catch(next);
  },
  fetchAll: function fetchAll(req, res, next) {
    _model2.default.find({}).sort({ createdAt: -1 }).then(function (list) {
      res.send({
        total: list.length,
        list: list
      });
    }).catch(next);

    // use local time: 
    //     new Date(2018, 1, 20, 23, 13, 27)
    // convert to ISO: 
    //     .toISOString() = "2018-02-21T07:13:27.000Z"
    // can use it intuitively: 
    //     .where('createdAt').gt(new Date(2018, 1, 20, 23, 13, 27).toISOString())
    // result:
    //     2018-02-21T07:14:28.372Z stay
    //     2018-02-21T07:13:26.372Z out
  }
};


function dotNotate(obj, target, prefix) {
  target = target || {}, prefix = prefix || "";

  Object.keys(obj).forEach(function (key) {
    if (_typeof(obj[key]) === "object") {
      dotNotate(obj[key], target, prefix + key + ".");
    } else {
      return target[prefix + key] = obj[key];
    }
  });

  return target;
}

// let larger = new Date(list[0].createdAt); // younger is bigger, have passed more time
// let smaller = new Date(2018, 1, 20, 23, 15, 33);
// // '2018-02-21T07:15:34.256Z' > 
// // '2018-02-21T07:15:33.000Z'
// console.log('local larger', larger.toLocaleString());
// console.log('>')
// console.log('local smaller', smaller.toLocaleString())
// console.log('is', larger>smaller)
//# sourceMappingURL=controller.js.map