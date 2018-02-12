import cheerio from 'cheerio';
import request from 'request';

// itemLookUp('https://www.amazon.com/Drive-Converter-FIDECO-Adapter-External/dp/B077N2KK27/ref=sr_1_1?ie=UTF8&qid=1518249729&sr=8-1&keywords=B077N2KK27')
//   .then(product=>{
//     console.log(product)
//   }).catch(e=>console.log(e));

export function itemLookUp(uri){
  return new Promise((resolve, reject) => {
    if(uri.search('/B0') < 0) return reject('No Product Id Found');
    let productId = 'B0' + uri.split('/B0')[1].split('/')[0];
    // let momentStarting = new Date();
    request(`https://www.amazon.com/s/field-keywords=${productId}`, (err, res, html) => {
            if(err|| !res || !html) return reject('500:Error');
            let $ = cheerio.load(html);
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
            // const momentEnding = new Date()
            // const period = momentEnding.getTime() - momentStarting.getTime() + ' ms';
            // console.log('period: ', period)
            if(!result.seller) return reject('400:Item Infomation is not complete.');
            resolve(result);
        })
    })
}