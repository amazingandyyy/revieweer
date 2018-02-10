import axios from 'axios';
import qs from 'qs';
import adsApi from './aws.ads';

function resolve(link) {
  const productId = link.split('/dp/')[1].split('/')[0];
  const obj = qs.parse(link.split('?')[1]);
  // console.log(productId,obj);
  // axios.get('https://www.amazon.com/Amazon-Echo-Show-Alexa-Enabled-Black/dp/B01J24C0TI/')
  const ADS = new adsApi({
    
  })
  return ADS.use({
    AssociateTag: 'revieweer-20',
    ItemId: productId,
    Operation: 'ItemLookup',
    ResponseGroup: 'Images%2CItemAttributes%2COffers%2CReviews',
    Service: 'AWSECommerceService',
    Timestamp: new Date().toISOString(),
    Version: '2013-08-01'
  }).then(r=>{
    console.log(r.data.response);
  }).catch(e=>{
    // console.log(e);
  })
}

resolve('https://www.amazon.com/Amazon-Echo-Show-Alexa-Enabled-Black/dp/B01J24C0TI/ref=br_msw_pdt-3?_encoding=UTF8&smid=ATVPDKIKX0DER&pf_rd_m=ATVPDKIKX0DER&pf_rd_s=&pf_rd_r=Z95QVFNR5CG9988WBERH&pf_rd_t=36701&pf_rd_p=60c4776a-4178-4e76-81d3-5620b07a5e78&pf_rd_i=desktop')

export default resolve;