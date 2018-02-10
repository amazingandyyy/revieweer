var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import hmacSHA256 from 'crypto-js/hmac-sha256';
import base64 from 'crypto-js/enc-base64';
import axios from 'axios';
import qs from 'qs';

var MWS = function () {
  function MWS(initOptions) {
    _classCallCheck(this, MWS);

    if (!initOptions.AmzSecretKey) throw new Error('AmzSecretKey is required to initialize an MWS instance');
    if (!initOptions.AWSAccessKeyId) throw new Error('AWSAccessKeyId is required to initialize an MWS instance');
    this.initOptions = initOptions;
  }

  _createClass(MWS, [{
    key: 'use',
    value: function use(o) {
      var options = Object.assign({}, o);
      var initOptions = this.initOptions;

      if (!options.MWSAuthToken) throw new Error('MWSAuthToken is required');

      var method = options.method || 'GET';
      var url = 'https://';
      url += options.base || 'mws.amazonservices.com';
      url += options.endpoint;

      options.params = {
        AWSAccessKeyId: options.AWSAccessKeyId || initOptions.AWSAccessKeyId,
        SignatureMethod: options.SignatureMethod || 'HmacSHA256',
        SignatureVersion: options.SignatureVersion || '2',
        Timestamp: options.Timestamp || new Date().toISOString()
      };

      var queryString = qs.stringify(options.params);

      var hmac = hmacSHA256(queryString, options.AmzSecretKey || initOptions.AmzSecretKey);
      var sig = base64.stringify(hmac);

      var deliveryOption = {
        method: method.toString().toLowerCase(),
        url: url,
        params: _extends({}, options.params, {
          Signature: sig
        })
      };
      console.log('request option', deliveryOption);
      return axios(deliveryOption);
    }
  }]);

  return MWS;
}();

export default MWS;