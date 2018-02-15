import cheerio from 'cheerio';
import axios from 'axios';

export function itemLookUpStream(uri){
  return new Promise((resolve, reject) => {
    if(!uri) return reject('No Uri Is Provided.')
    if(uri.search('/B0') < 0) return reject('No Product Id Found');
    let productId = 'B0' + uri.split('/B0')[1].split('/')[0];
    // let momentStarting = new Date();
    axios(`https://www.amazon.com/s/field-keywords=${productId}`)
    .then(res=> {
        let $ = cheerio.load(res.data);
        let result = {};
        let item = $('#s-results-list-atf').find(`li[data-asin="${productId}"]`);
        result.imageURL = $(item).find('.a-fixed-left-grid-col.a-col-left').find('.s-access-image').attr('src');
        result.title = $(item).find('.a-fixed-left-grid-col.a-col-left').find('.s-access-image').attr('alt');
        result.link = $(item).find('.a-fixed-left-grid-col.a-col-left').find('.a-link-normal').attr('href');
        let sellStepOne = $(item).find('.a-fixed-left-grid-col.a-col-right').find('.a-row.a-spacing-none')['1'];
        let sellStepTwo = $(sellStepOne).find('span.a-size-small.a-color-secondary')['1']
        let priceElm = $(item).find('.sx-price.sx-price-large');
        let whole = $(priceElm).find('.sx-price-whole').html()
        let fact = $(priceElm).find('.sx-price-fractional').html()
        result.price = Number(whole) + 0.01 * Number(fact);
        result.seller = $(sellStepTwo).html();
        result.productId = productId;
        // const momentEnding = new Date()
        // const period = momentEnding.getTime() - momentStarting.getTime() + ' ms';
        // console.log('period: ', period)
        // console.log(result);
        if(!result.productId || !result.imageURL) return reject('400:Item Information is not complete.');
        resolve(result);
        })
    })
}
