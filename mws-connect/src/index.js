import hmacSHA256 from 'crypto-js/hmac-sha256';
import base64 from 'crypto-js/enc-base64';
import axios from 'axios';
import qs from 'qs';

class MWS {
  constructor(initOptions){
    if (!initOptions.AmzSecretKey) throw new Error('AmzSecretKey is required to initialize an MWS instance');
    if (!initOptions.AWSAccessKeyId) throw new Error('AWSAccessKeyId is required to initialize an MWS instance');
    this.initOptions = initOptions;
  }
  use(o) {
    let options = Object.assign({}, o);
    const {initOptions} = this;
    if (!options.MWSAuthToken) throw new Error('MWSAuthToken is required');
    
    const method = options.method || 'GET';
    let url = 'https://';
    url += options.base || 'mws.amazonservices.com';
    url += options.endpoint;
    
    options.params = {
      AWSAccessKeyId: options.AWSAccessKeyId || initOptions.AWSAccessKeyId,
      SignatureMethod: options.SignatureMethod || 'HmacSHA256',
      SignatureVersion: options.SignatureVersion || '2',
      Timestamp: options.Timestamp || new Date().toISOString()
    }

    let queryString = qs.stringify(options.params);

    const hmac = hmacSHA256(queryString, options.AmzSecretKey || initOptions.AmzSecretKey);
    let sig = base64.stringify(hmac);

    let deliveryOption = {
      method: method.toString().toLowerCase(),
      url: url,
      params: {
        ...options.params,
        Signature: sig
      }
    }
    console.log('request option', deliveryOption)
    return axios(deliveryOption);
  }
}

export default MWS;