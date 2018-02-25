'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.itemLookUp = itemLookUp;

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// itemLookUp('https://www.amazon.com/Drive-Converter-FIDECO-Adapter-External/dp/B077N2KK27/ref=sr_1_1?ie=UTF8&qid=1518249729&sr=8-1&keywords=B077N2KK27')
//   .then(product=>{
//     console.log(product)
//   }).catch(e=>console.log(e));

function itemLookUp(uri) {
  return new Promise(function (resolve, reject) {
    if (!uri) return reject('No Uri Is Provided.');
    if (uri.search('/B0') < 0) return reject('No Product Id Found');
    var productId = 'B0' + uri.split('/B0')[1].split('/')[0];
    // let momentStarting = new Date();
    (0, _request2.default)('https://www.amazon.com/s/field-keywords=' + productId, function (err, res, html) {
      if (err || !res || !html) return reject('500:Error');
      // console.log('htmllll', html);
      var $ = _cheerio2.default.load(html);
      var result = {};
      var item = $('#s-results-list-atf').find('li[data-asin="' + productId + '"]');
      result.imageURL = $(item).find('.a-fixed-left-grid-col.a-col-left').find('.s-access-image').attr('src');
      result.title = $(item).find('.a-fixed-left-grid-col.a-col-left').find('.s-access-image').attr('alt');
      result.link = $(item).find('.a-fixed-left-grid-col.a-col-left').find('.a-link-normal').attr('href');
      var sellStepOne = $(item).find('.a-fixed-left-grid-col.a-col-right').find('.a-row.a-spacing-none')['1'];
      var sellStepTwo = $(sellStepOne).find('span.a-size-small.a-color-secondary')['1'];
      var priceElm = $(item).find('.sx-price.sx-price-large');
      var whole = $(priceElm).find('.sx-price-whole').html();
      var fact = $(priceElm).find('.sx-price-fractional').html();
      result.price = Number(whole) + 0.01 * Number(fact);
      result.seller = $(sellStepTwo).html();
      result.productId = productId;
      // const momentEnding = new Date()
      // const period = momentEnding.getTime() - momentStarting.getTime() + ' ms';
      // console.log('period: ', period)
      // console.log(result);
      if (!result.productId || !result.imageURL) return reject('400:Item Information is not complete.');
      resolve(result);
    });
  });
}
//# sourceMappingURL=itemLookUp.js.map