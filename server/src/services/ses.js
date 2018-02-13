import ses from 'node-ses';
import config from '../config';

const AWS_KEY= config.aws.AccessKeyId;
const AWS_SECRET=config.aws.SecretAccessKey;
const AWS_SES_SENDER='team@revieweer.com';

var SESserver = ses.createClient({
  key: AWS_KEY,
  secret: AWS_SECRET
})

export function service(obj){
  return new Promise((resolve, reject) => {
    SESserver.sendEmail({
      from: AWS_SES_SENDER, 
      ...obj
    }, function(err, data) {
      if (err) return reject(err);
      console.log('ses', data);
      resolve(obj.to);
    })
  })
}