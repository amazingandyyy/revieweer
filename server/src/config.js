import dotenv from 'dotenv';
import path from 'path';
if(process.env.NODE_ENV != 'production'){
  dotenv.config({ path: path.resolve(__dirname, '.env') });
}

export default {
  jwt_secret: process.env.JWT_SECRET || 'jwt_secret_FJLK:',
  jwt_secret_email: process.env.JWT_SECRET_EMAIL || 'jwt_secret_email',
  URIDomain: process.env.NODE_ENV == 'production' ? 'https://www.revieweer.com/' : 'localhost:8080/',
  mongoose: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost/revieweer'
  },
  AmzSecretKey: process.env.AmzSecretKey || '',
  AWSAccessKeyId: process.env.AWSAccessKeyId || '',
  sentryDSN: process.env.SENTRY_DSN || '',
  admin: {
    passcode: process.env.adminKey,
    list: ['amazingandyyy@gmail.com']
  }
}