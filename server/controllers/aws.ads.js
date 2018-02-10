import hmacSHA256 from 'crypto-js/hmac-sha256';
import base64 from 'crypto-js/enc-base64';
import axios from 'axios';
import qs from 'qs';

class ADS {
  constructor(initOptions){
    if (!initOptions.AmzSecretKey) throw new Error('AmzSecretKey is required to initialize an MWS instance');
    if (!initOptions.AWSAccessKeyId) throw new Error('AWSAccessKeyId is required to initialize an MWS instance');
    this.initOptions = initOptions;
  }
  use(o) {
    let options = Object.assign({}, o);
    const {initOptions} = this;
    
    const method = options.method || 'GET';
    let url = 'https://';
    url += options.base || 'webservices.amazon.com/onca/xml';
    url += options.endpoint || '';
    
    options.params = {
      AWSAccessKeyId: options.AWSAccessKeyId || initOptions.AWSAccessKeyId,
      // SignatureMethod: options.SignatureMethod || 'HmacSHA256',
      // SignatureVersion: options.SignatureVersion || '2',
      ...options,
      Timestamp: options.Timestamp || new Date().toISOString()
    }

    let queryString = qs.stringify(options.params);
    console.log(queryString)

    const hmac = hmacSHA256(queryString, options.AmzSecretKey || initOptions.AmzSecretKey);
    console.log(hmac)
    let sig = base64.stringify(hmac);
    console.log(sig);
    let sigString = sig.replace(/+/g, '%2B');
    console.log(sigString);

    let deliveryOption = {
      method: method.toString().toLowerCase(),
      url: url,
      params: {
        ...options.params,
        Signature: sig
      }
    }
    // console.log(deliveryOption)
    // console.log('request option', deliveryOption)
    return axios(deliveryOption);
  }
}

export default ADS;