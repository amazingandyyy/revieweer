'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFromAmazonSourceToRevieer = undefined;

var _product = require('../models/product');

var _product2 = _interopRequireDefault(_product);

var _services = require('../services');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  createFromAmazonSource: function createFromAmazonSource(req, res, next) {
    var source = req.query.source;

    if (!source) return next('403:source is required');
    createFromAmazonSourceToRevieer(source).then(function (id) {
      return res.send(id);
    }).catch(next);
  },
  getOneFromAmazon: function getOneFromAmazon(req, res, next) {
    var source = req.query.source;

    if (!source) return next('403:source is required');
    (0, _services.itemLookUp)(source).then(function (p) {
      return res.send(p);
    }).catch(next);
  },
  getOneFromRevieweer: function getOneFromRevieweer(req, res, next) {
    var productId = req.query.productId;

    _product2.default.findById(productId).then(function (p) {
      return res.send(p);
    }).catch(next);
  },
  endOneProductById: function endOneProductById(req, res, next) {
    _product2.default.findByIdAndUpdate(req.params.id, { end: true }).then(function (_) {
      return res.send();
    }).catch(next);
  },
  activeOneProductById: function activeOneProductById(req, res, next) {
    _product2.default.findByIdAndUpdate(req.params.id, { end: false }).then(function (_) {
      return res.send();
    }).catch(next);
  }
};
var createFromAmazonSourceToRevieer = exports.createFromAmazonSourceToRevieer = function createFromAmazonSourceToRevieer(link) {
  return new Promise(function (resolve, reject) {
    (0, _services.itemLookUpStream)(link).then(function (p) {
      var imageURL = p.imageURL,
          title = p.title,
          link = p.link,
          price = p.price,
          seller = p.seller,
          productId = p.productId;

      var product = new _product2.default({
        basic_info: {
          imageURL: imageURL, title: title, link: link, price: price, seller: seller
        },
        productId: productId
      });
      product.save().then(function (savedProduct) {
        resolve(savedProduct._id);
      }).catch(function (err) {
        if (err.code == 11000) return reject(['The product is existing', err.op.end]);
        reject(err);
      });
    }).catch(function (err) {
      return reject(err);
    });
  });
};
//# sourceMappingURL=product.js.map