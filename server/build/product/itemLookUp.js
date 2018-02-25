'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = itemLookUp;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function itemLookUp(productId, cb) {
    if (!productId) return cb(new Error('No productId Is Provided.'));
    _model2.default.findOne({ productId: productId }).then(function (p) {
        if (!p) return searchViaApify();
        return cb(null, {
            message: 'Existing',
            productId: p._id
        });
    }).catch(function (err) {
        return cb(err);
    });

    var searchViaApify = function searchViaApify() {
        _axios2.default.post('https://api.apify.com/v1/k85BDCrCt5HTrNAE4/crawlers/xZbpx7AEMEzYCQMLP/execute?token=' + _config2.default.apifyToken.itemLookUp, {
            "startUrls": [{
                "key": "START",
                "value": 'https://www.amazon.com/s/field-keywords=' + productId
            }]
        }).then(function (r) {
            return cb(null, {
                message: 'New',
                productPendingId: r.data._id
            });
        }).catch(function (err) {
            return cb(err);
        });
    };
}

// For information about migrating to our APIs refer to our 
// Marketplace APIs at https://developer.amazonservices.com/ref=rm_c_sv
// our Product Advertising API at https://affiliate-program.amazon.com/gp/advertising/api/detail/main.html/ref=rm_c_ac for advertising use cases.

//
//
// Testing //
// itemLookUp('https://www.amazon.com/Drive-Converter-FIDECO-Adapter-External/dp/B077N2KK27/ref=sr_1_1?ie=UTF8&qid=1518249729&sr=8-1&keywords=B077N2KK27')
//   .then(product=>{
//     console.log('product', product)
//   }).catch(e=>console.log(e));
//
//
//# sourceMappingURL=itemLookUp.js.map