import AWS from 'aws-sdk';

import Email from './email';
import User from './model';
import config from '../config';
import JWT from './jwt';
import uuid from './uuid';

export default {
  signupWithEmail: (req, res, next) => {
    const { email } = req.body;
    (!email)? next('You Must Provide Email.'):
    User.findOne({
      email: email
    }).then(user => {
      if (user) return next('403:Email is in use.');
      const { origin } = req.headers;
      const tokenn = JWT.generateTokenWithEmail(email);
      const deepLink = `${origin}/#signupVerification?token=${tokenn}&address=${email}`;
      const mailObj = {
        to: email,
        subject: '[Revieweer]Welcome and Account Activation.',
        message: (config.version=='public' || config.version=='internal')?activationEmailTemplate(deepLink):accessRequestEmailTemplate(deepLink)
      };
      Email.send(mailObj).then(email=>{
        res.send({email});
      }).catch((err)=>{
        next('500:Email is bad.')
      });
    }).catch(next);
  },
  verifyEmailToken: (req, res, next) => {
    JWT.verifyEmailToken(req.body.token, (err, address) => {
      if (err) return res.sendStatus(401);
      res.send(address);
    })
  },
  signup: (req, res, next) => {
    const { email, password, firstName, lastName, avatar } = req.body;
    JWT.verifyEmailToken(req.params.token, (err, address) => {
      if (err || (address !== email) || (!email || !password)) return res.sendStatus(401);
      User
      .findOne({ email })
      .then(existingUser => {
        if (existingUser) return next('422:Email is in use');
        const newUser = new User({
          name: {
            first: firstName,
            last: lastName
          },
          email,
          password,
          avatar
        })
        
        newUser.save()
        .then(savedUser => {
          return res.send({
            token: JWT.generateToken(savedUser), 
            isAdmin: (config.admin.list.indexOf(savedUser.email)!=-1),
            status: true
          })
        })
        .catch(next);
      })
      .catch(next);
    })
  },

  signin: (req, res, next) => {
    const { email, password } = req.body;
    (!email || !password)?next('You Must Provide Email And Password'):
      User.findOne({ email })
      .then(user => {
        if(!user)return next('404:User Is Not Found');
        user.comparedPassword(password, (err, good) => {
          (err || !good)?next(err || '403:Password Is Incorrect'):
          res.send({token: JWT.generateToken(user), isAdmin: (config.admin.list.indexOf(user.email)!=-1)});
        })
      }).catch(next)
  },

  updateProfile: (req, res, next) => {
    req.user.comparedPassword(req.body.password, (err, good) => {
      if (err) return next(err);
      if (!good) return next('401:Incorrect Password');
      
      const userId = req.user._id;
      const newProfile = {
        name: {
          first: req.body.firstName,
          last: req.body.lastName
        },
        venmoId: req.body.venmoId || null
      };
      User.findByIdAndUpdate(userId, newProfile, { new: true })
      .then(newUser => res.sendStatus(200))
      .catch(next)
    })
  },

  updateProfileAvatar: (req, res, next) => {
    const file = req.file;
    const userId = req.user._id;
    if(!file) return next('500:image bad');
    const fieldname = file.fieldname;
    let filenameParts = file.originalname.split('.');
    let ext;
    if (filenameParts.length > 1) {
      ext = "." + filenameParts.pop();
    } else {
      ext = '';
    }

    const AWS_KEY_ID = config.aws.accessKeyId || process.env.AWSAccessKeyId;
    const AWS_SECRET = config.aws.secretKey || process.env.AWSSecretKey;

    const uuidKey = `${config.environment}/users/${userId}/${fieldname}/${uuid()}${ext}`;
    AWS.config.update({
      accessKeyId: AWS_KEY_ID,
      secretAccessKey: AWS_SECRET,
      subregion: 'us-west-1'
    });
    const s3 = new AWS.S3();
    s3.putObject({
      Bucket: 'revieweer',
      Key: uuidKey, 
      Body: file.buffer,
      ACL: 'public-read'
    }, (err, result) => {
      if (err) return next('500:Uploading Photo Failed');
      const avatarURL = `https://s3-us-west-1.amazonaws.com/revieweer/${uuidKey}`
      User.findByIdAndUpdate(userId, { $set:{avatar: avatarURL} }, { new: true })
      .then(_ => res.sendStatus(200))
      .catch(next)
    })
  }
}

const accessRequestEmailTemplate = (deepLink) => {
  return `<b>Welcome to Revieweer</b>
  <br/>
  You are in line to Beta Access!
  <br/>
  Please feel free to reply this email or reach out to us via team@revieweer.com anytime.
  <br/>
  <br/>
  Regards,
  <br/>
  <b>The Revieweer team</b>
  `
}

const activationEmailTemplate = (deepLink) => {
  return `<b>Welcome to Revieweer,</b>
  <br/>
  <br/>
  If you requested this activation, please go to the following URL to confirm this email and continue to use this email address as your account username,
  <br/>
  <br/>
  <a href='${deepLink}' target='_blank'>${deepLink}</a>
  <br/> 
  <br/> 
  <p>--------------</p>
  <br/> 
  Enjoy the benefits of being a revieweer:
  <br/>
  <ul>
    <li><b>Explore:</b> explore new products to try.</li>
    <li><b>Review:</b> amazing review with photo to help business grow</li>
    <li><b>Earn:</b> we pay you up to 100% cashback + cash rewards</li>
  </ul>
  <br/>
  We are looking forward to <b>your experience</b>. 
  <br/>
  Please feel free to reply this email or reach out to us via team@revieweer.com anytime.
  <br/>
  <br/>
  <br/>
  Regards,
  <br/>
  <b>The Revieweer team</b>
  `
}