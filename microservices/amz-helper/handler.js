'use strict';

var cheerio = require('cheerio');
var axios = require('axios');

module.exports.itemLookUp = (event, c, callback) => {
  var productId = event.queryStringParameters.prouctId;
  console.log(productId);
  return lookUp(productId, callback, {});
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
  axios.get('https://www.amazon.com/s/field-keywords='+productId)
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
      console.log(result);
      setTimeout(function(){
        return lookUp(productId, cb, result);
      }, 200)
  }).catch(function(err){
    return cb(new Error('bad'));
  })
}