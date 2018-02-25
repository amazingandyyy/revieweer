'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginRequired = loginRequired;
exports.adminReuired = adminReuired;
exports.apifyRequired = apifyRequired;

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _model = require('./user/model');

var _model2 = _interopRequireDefault(_model);

var _jwt = require('./user/jwt');

var _jwt2 = _interopRequireDefault(_jwt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loginRequired(req, res, next) {
  var h = req.header('Authorization');
  !h ? next('403:Please make sure your request has an Authorization header.') : _jwt2.default.verifyToken(h, function (err, payload) {
    if (err) return next('401:' + err.message);
    _model2.default.findById(payload.sub).then(function (user) {
      if (!user) return next('404:User not found!');
      req.user = user;
      delete req.user.password;
      next();
    }).catch(next);
  });
}
function adminReuired(_ref, res, next) {
  var user = _ref.user;

  return _config2.default.admin.list.includes(user.email) ? next() : next('401:Admin Authorization Failed ');
}

function apifyRequired(req, res, next) {
  var h = req.body.data == 'Apify_Authorization';
  if (!h) return next('403:Need Authorization payload.');
  if (h !== 'Apify_Authorization') return next('403:Authorization is bad.');
  next();
}
//# sourceMappingURL=middlewares.js.map