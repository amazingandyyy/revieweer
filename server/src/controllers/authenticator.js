import {token, SES} from '../services';
import User from '../models/user';

export default {
  signupWithEmail: (req, res, next) => {
    const { email } = req.body;
    (!email)? next('You Must Provide Email.'):
    User.findOne({
      email: email
    }).then(user => {
      if (user) return next('403:Email is in use.');
      const { origin } = req.headers;
      const tokenn = token.generateTokenWithEmail(email);
      const deepLink = `${origin}/#signupVerification?token=${tokenn}&address=${email}`;
      const mailObj = {
        to: email,
        subject: '[Revieweer]Welcome and Account Activation.',
        message: `<b>Welcome to Revieweer,
        </b>
        If you requested this activation, please go to the following URL to confirm this email and continue to use this email address as your Revieweer account username,
        <br/>
        <a href='${deepLink}' target='_blank'>${deepLink}</a>
        <br/> 
        Enjoy the benefits of being a revieweer:
        <br/>
        <ul>
          <li><b>Explore:</b> explore new products to try.</li>
          <li><b>Review:</b> amazing review with photo to help business grow</li>
          <li><b>Earn:</b> we pay you up to 100% cashback + cash rewards</li>
        </ul>
        <br/>
        We are looking forward to <b>your experience</b>. Please feel free to reach out to us via team@revieweer.com
        <br/>
        The best,<br/>
        <b>Revieweer Team</b>
        `
      };
      SES.send(mailObj).then(email=>{
        res.send({email});
      }).catch((err)=>{
        next('500:Email is bad.')
      });
    }).catch(next);
  },
  verifyEmailToken: (req, res, next) => {
    token.verifyEmailToken(req.body.token, (err, address) => {
      if (err) return res.sendStatus(401);
      res.send(address);
    })
  },
  signup: (req, res, next) => {
    const { email, password, firstName, lastName } = req.body;
    token.verifyEmailToken(req.params.token, (err, address) => {
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
          password
        })
        
        newUser.save()
        .then(savedUser => res.json({ success: true, token: token.generateToken(savedUser) }))
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
        user.comparedPassword(password, (err, good) => {
          (err || !good)?next(err || '403:Password Is Incorrect'):
          res.send({token: token.generateToken(user)});
        })
      }).catch(next)
  },

  updateProfile: (req, res, next) => {
    req.user.comparedPassword(req.body.password, (err, good) => {
      if (err) return next(err);
      if (!good) return next('401:Bad Password');
      
      const userId = req.user._id;
      const newProfile = {
        name: {
          first: req.body.firstName,
          last: req.body.lastName
        }
      };
      delete newProfile.password;

      User.findByIdAndUpdate(userId, newProfile, { new: true })
      .then(newUser => res.sendStatus(200))
      .catch(next)
    })
  }

}