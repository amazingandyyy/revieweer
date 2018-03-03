import AWS from 'aws-sdk';
import config from '../config';

const s3 = new AWS.S3();

const AWS_KEY= config.aws.accessKeyId;
const AWS_SECRET=config.aws.secretKey;

AWS.config.update({
  accessKeyId: AWS_KEY,
  secretAccessKey: AWS_SECRET
});

// subregion: 'us-west-2',

export default s3;