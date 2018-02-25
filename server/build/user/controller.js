'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _email = require('./email');

var _email2 = _interopRequireDefault(_email);

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _jwt = require('./jwt');

var _jwt2 = _interopRequireDefault(_jwt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  signupWithEmail: function signupWithEmail(req, res, next) {
    var email = req.body.email;

    !email ? next('You Must Provide Email.') : _model2.default.findOne({
      email: email
    }).then(function (user) {
      if (user) return next('403:Email is in use.');
      var origin = req.headers.origin;

      var tokenn = _jwt2.default.generateTokenWithEmail(email);
      var deepLink = origin + '/#signupVerification?token=' + tokenn + '&address=' + email;
      var mailObj = {
        to: email,
        subject: '[Revieweer]Welcome and Account Activation.',
        message: activationEmailTemplate(deepLink)
      };
      _email2.default.send(mailObj).then(function (email) {
        res.send({ email: email });
      }).catch(function (err) {
        next('500:Email is bad.');
      });
    }).catch(next);
  },
  verifyEmailToken: function verifyEmailToken(req, res, next) {
    _jwt2.default.verifyEmailToken(req.body.token, function (err, address) {
      if (err) return res.sendStatus(401);
      res.send(address);
    });
  },
  signup: function signup(req, res, next) {
    var _req$body = req.body,
        email = _req$body.email,
        password = _req$body.password,
        firstName = _req$body.firstName,
        lastName = _req$body.lastName;

    _jwt2.default.verifyEmailToken(req.params.token, function (err, address) {
      if (err || address !== email || !email || !password) return res.sendStatus(401);
      _model2.default.findOne({ email: email }).then(function (existingUser) {
        if (existingUser) return next('422:Email is in use');
        var newUser = new _model2.default({
          name: {
            first: firstName,
            last: lastName
          },
          email: email,
          password: password
        });

        newUser.save().then(function (savedUser) {
          return res.send({
            token: _jwt2.default.generateToken(savedUser),
            isAdmin: _config2.default.admin.list.indexOf(savedUser.email) != -1,
            status: true
          });
        }).catch(next);
      }).catch(next);
    });
  },

  signin: function signin(req, res, next) {
    var _req$body2 = req.body,
        email = _req$body2.email,
        password = _req$body2.password;

    !email || !password ? next('You Must Provide Email And Password') : _model2.default.findOne({ email: email }).then(function (user) {
      if (!user) return next('404:User Is Not Found');
      user.comparedPassword(password, function (err, good) {
        err || !good ? next(err || '403:Password Is Incorrect') : res.send({ token: _jwt2.default.generateToken(user), isAdmin: _config2.default.admin.list.indexOf(user.email) != -1 });
      });
    }).catch(next);
  },

  updateProfile: function updateProfile(req, res, next) {
    req.user.comparedPassword(req.body.password, function (err, good) {
      if (err) return next(err);
      if (!good) return next('401:Incorrect Password');

      var userId = req.user._id;
      var newProfile = {
        name: {
          first: req.body.firstName,
          last: req.body.lastName
        }
      };
      delete newProfile.password;

      _model2.default.findByIdAndUpdate(userId, newProfile, { new: true }).then(function (newUser) {
        return res.sendStatus(200);
      }).catch(next);
    });
  }

};


var activationEmailTemplate = function activationEmailTemplate(deepLink) {
  return '<b>Welcome to Revieweer,</b>\n  <br/>\n  <br/>\n  If you requested this activation, please go to the following URL to confirm this email and continue to use this email address as your account username,\n  <br/>\n  <br/>\n  <a href=\'' + deepLink + '\' target=\'_blank\'>' + deepLink + '</a>\n  <br/> \n  <br/> \n  <p>--------------</p>\n  <br/> \n  Enjoy the benefits of being a revieweer:\n  <br/>\n  <ul>\n    <li><b>Explore:</b> explore new products to try.</li>\n    <li><b>Review:</b> amazing review with photo to help business grow</li>\n    <li><b>Earn:</b> we pay you up to 100% cashback + cash rewards</li>\n  </ul>\n  <br/>\n  We are looking forward to <b>your experience</b>. \n  <br/>\n  Please feel free to reply this email or reach out to us via team@revieweer.com anytime.\n  <br/>\n  <br/>\n  <br/>\n  Regards,\n  <br/>\n  <b>The Revieweer team</b>\n  ';
};
//# sourceMappingURL=controller.js.map