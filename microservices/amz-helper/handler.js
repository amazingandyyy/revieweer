'use strict';

var cheerio = require('cheerio');
var axios = require('axios');
// let LAMBDA_UNSAFE_TOKEN = process.env.LAMBDA_UNSAFE_TOKEN;
let LAMBDA_UNSAFE_TOKEN = process.env.LAMBDA_UNSAFE_TOKEN || 'LAMBDA_UNSAFE_TOKEN';

module.exports.itemLookUp = (event, c, callback) => {
  var token = event.queryStringParameters.token;
  var productId = event.queryStringParameters.productId;
  if(!productId) return callback(new Error('Product Id Bad'));
  if(token == LAMBDA_UNSAFE_TOKEN) {
    return lookUp(productId, callback, {});
  }
  callback(new Error('Token Bad'));
};

function lookUp(productId, cb, result) {
  if(result.imageURL && result.seller) {
    var response = {
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      },
      body: JSON.stringify({result: result})
    };
    return cb(null, response);
  }
  let request = axios.create({
    'Access-Control-Allow-Origin': '*'
  });
  request.get('https://www.amazon.com/s/field-keywords='+productId)
  .then(function(res){
      var $ = cheerio.load(res.data);
      var item = $('#s-results-list-atf').find('li[data-asin="'+productId+'"]');
      result.imageURL = $(item).find('.a-fixed-left-grid-col.a-col-left').find('.s-access-image').attr('src');
      result.title = $(item).find('.a-fixed-left-grid-col.a-col-left').find('.s-access-image').attr('alt');
      result.link = $(item).find('.a-fixed-left-grid-col.a-col-left').find('.a-link-normal').attr('href');
      var sellStepOne = $(item).find('.a-fixed-left-grid-col.a-col-right').find('.a-row.a-spacing-none')['1'];
      var sellStepTwo = $(sellStepOne).find('span.a-size-small.a-color-secondary')['1']
      var priceElm = $(item).find('.sx-price.sx-price-large');
      var whole = $(priceElm).find('.sx-price-whole').html()
      var fact = $(priceElm).find('.sx-price-fractional').html()
      result.price = Number(whole) + 0.01 * Number(fact);
      result.seller = $(sellStepTwo).html();
      result.productId = productId;
      setTimeout(function(){
        return lookUp(productId, cb, result);
      }, 50 + Math.round(Math.random() * 250))
  }).catch(function(err){
    setTimeout(function(){
      return lookUp(productId, cb, result);
    }, 50 + Math.round(Math.random() * 250))
  })
}