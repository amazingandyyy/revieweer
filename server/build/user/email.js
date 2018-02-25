'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _nodeSes = require('node-ses');

var _nodeSes2 = _interopRequireDefault(_nodeSes);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AWS_KEY = _config2.default.aws.accessKeyId;
var AWS_SECRET = _config2.default.aws.secretKey;
var AWS_SES_SENDER = 'team@revieweer.com';

var SESserver = _nodeSes2.default.createClient({
  key: AWS_KEY,
  secret: AWS_SECRET
});

var Email = {
  send: function send(obj) {
    return new Promise(function (resolve, reject) {
      SESserver.sendEmail(_extends({
        from: AWS_SES_SENDER
      }, obj), function (err, data) {
        if (err) return reject(err);
        // console.log('ses', data);

        // Error { 
        //  Type: 'Sender',
        //  Code: 'MessageRejected',
        //  Message: 'Email address is not verified. The following identities failed the check in region US-EAST-1: amazingandyyy@gmail.com' 
        // }

        // Good 
        // <SendEmailResponse xmlns="http://ses.amazonaws.com/doc/2010-12-01/">
        //   <SendEmailResult>
        //     <MessageId>0100016193380f61-95eef9bc-018c-49dd-8fd0-18e46455a347-000000</MessageId>
        //   </SendEmailResult>
        //   <ResponseMetadata>
        //     <RequestId>d1584fef-1158-11e8-962a-15378f5aaf10</RequestId>
        //   </ResponseMetadata>
        // </SendEmailResponse>
        resolve(obj.to);
      });
    });
  }
};

exports.default = Email;

// const mailObj = {
//   to: 'amazingandyyy@gmail.com',
//   subject: '[Revieweer]Welcome and Account Activation.',
//   message: `<b>Welcome to join Revieweer,</b> <br/><br/><br/>
//   Please click <a href='${'deepLink'}' target='_blank'>here</a> to your activate your account.
//   <br/>
//   Enjoy of being a revieweer:
//   <br/>
//   <ul>
//     <li>Explore: explore new products to try.</li>
//     <li>Review: amazing review with photo to help business grow</li>
//     <li>Earn: we pay you up to 100% cashback + cash rewards</li>
//   </ul>
//   <br/>
//   The best, Revieweer Team.`
// };
// SES.send(mailObj).then(email=>{
//   console.log(email)
// }).catch(err=>{
//   console.log(err);
// });
//# sourceMappingURL=email.js.map