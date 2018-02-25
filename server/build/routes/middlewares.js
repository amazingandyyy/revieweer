'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _services = require('../services');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  loginRequired: function loginRequired(req, res, next) {
    var h = req.header('Authorization');
    !h ? next('403:Please make sure your request has an Authorization header.') : _services.token.verifyToken(h, function (err, payload) {
      if (err) return next('401:' + err.message);
      _user2.default.findById(payload.sub).then(function (user) {
        if (!user) return next('404:User not found!');
        req.user = user;
        delete req.user.password;
        next();
      }).catch(next);
    });
  },
  adminReuired: function adminReuired(_ref, res, next) {
    var user = _ref.user;
    return _config2.default.admin.list.includes(user.email) ? next() : next('401:Admin Authorization Failed ');
  }
};
//# sourceMappingURL=middlewares.js.map