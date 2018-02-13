// import hmacSHA256 from 'crypto-js/hmac-sha256';
// import base64 from 'crypto-js/enc-base64';
// import axios from 'axios';

// class ADS {
//   constructor(initOptions){
//     if (!initOptions.AmzSecretKey) throw new Error('AmzSecretKey is required to initialize an MWS instance');
//     if (!initOptions.AWSAccessKeyId) throw new Error('AWSAccessKeyId is required to initialize an MWS instance');
//     this.initOptions = initOptions;
//   }
//   use(o) {
//     let options = Object.assign({}, o);
//     const {initOptions} = this;
    
//     const method = options.method || 'GET';
//     let url = 'https://';
//     url += options.base || 'webservices.amazon.com/onca/xml';
//     url += options.endpoint || '';
//     let tm = new Date().toISOString()
//     options.params = {
//       AWSAccessKeyId: options.AWSAccessKeyId || initOptions.AWSAccessKeyId,
//       ...options,
//       Timestamp: tm
//     }
//     console.log(options.params.Timestamp);

//     let paramsArr = Object.keys(options.params).map((param) => [param, options.params[param]]);
//     paramsArr.sort((a, b) =>  a[0] > b[0] ? 1 : -1)

//     let keys = [];
//     let vals = [];
//     paramsArr.forEach(tuple => {
//       keys.push(encodeURIComponent(tuple[0]));
//       vals.push(encodeURIComponent(tuple[1]));
//     });

//     let paramsString = keys.map((key, index) => {
//       return key + '=' + vals[index];
//     }).join("&");
//     // AWSAccessKeyId=AKIAIAOHXIHGOHSC4TJA&AssociateTag=revieweer-20&ItemId=B01J24C0TI&Operation=ItemLookup&ResponseGroup=Images%252CItemAttributes%252COffers%252CReviews&Service=AWSECommerceService&Timestamp=2018-02-10T07%3A37%3A41.694Z&Version=2013-08-01
//     // Service=AWSECommerceService&Operation=ItemLookup&SubscriptionId=AKIAIAOHXIHGOHSC4TJA&AssociateTag=revieweer-20&ItemId=B01J24C0TI&IdType=ASIN&ResponseGroup=Images,ItemAttributes,Offers,Reviews
//     let queryString = 'AWSAccessKeyId=AKIAIAOHXIHGOHSC4TJA&AssociateTag=revieweer-20&IdType=ASIN&ItemId=B01J24C0TI&Operation=ItemLookup&ResponseGroup=Images%2CItemAttributes%2COffers%2CReviews&Service=AWSECommerceService&Timestamp=2018-02-10T07%3A36%3A59.000Z'
//     let query = [method, options.base, options.endpoint, paramsString];
//     console.log(query);

//     const hmac = hmacSHA256(queryString, options.AmzSecretKey || initOptions.AmzSecretKey);
//     let sig = base64.stringify(hmac);
//     let sigString = sig.replace(/\+/g, '%2B').replace(/=/g, '%3D');
//     console.log('sigString:::', sigString);
//     let deliveryOption = {
//       method: method.toString().toLowerCase(),
//       url: url,
//       params: {
//         ...options.params,
//         Signature: sigString
//       }
//     }
//     // console.log(deliveryOption)
//     // console.log('request option', deliveryOption)
//     return axios(deliveryOption);
//   }
// }

// export default ADS;

// // /onca/xml?AWSAccessKeyId=AKIAIOSFODNN7EXAMPLE&AssociateTag=mytag-20&ItemId=0679722769&Operation=ItemLookup&ResponseGroup=Images%2CItemAttributes%2COffers%2CReviews&Service=AWSECommerceService&Timestamp=2014-08-18T12%3A00%3A00Z&Version=2013-08-01&Signature=j7bZM0LXZ9eXeZruTqWm2DIvDYVUU3wxPPpp%2BiXxzQc%3D
// // /onca/xml?AWSAccessKeyId=AKIAIAOHXIHGOHSC4TJA&AssociateTag=revieweer-20&ItemId=B01J24C0TI&Operation=ItemLookup&ResponseGroup=Images%252CItemAttributes%252COffers%252CReviews&Service=AWSECommerceService&Timestamp=2018-02-10T07:02:50.862Z&Version=2013-08-01&Signature=kGCUZMW7AVo2O07KYZYx%2BhIcbB%2FtmbjXDcS%2FOh4CpfI%3D
