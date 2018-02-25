'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

var _progress = require('./progress');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  startOne: function startOne(req, res, next) {
    var productId = req.query.productId;

    if (!productId) return next('403:No productId');
    _model2.default.findOne({
      user: req.user._id,
      product: productId
    }).then(function (c) {
      if (!c) {
        // the first visit
        // create case
        _model2.default.create({
          user: req.user._id,
          product: productId,
          progress: _progress.progressStatus['viewed'],
          payload: {
            viewed: 1
          }
        }).then(function (c) {
          return res.send(c._id);
        }).catch(next);
      } else {
        // not the first visit AND not started yet
        if (c.progress == _progress.progressStatus['viewed']) {
          // update viewing counts
          // in order to analyze how many times users check but not yet start.
          _model2.default.findByIdAndUpdate(c._id, {
            $inc: { 'payload.viewed': 1 }
          }).then(function (c) {
            res.send(c._id);
          });
        }
      }
    }).catch(next);
  },
  fetchOne: function fetchOne(req, res, next) {
    var caseId = req.query.caseId;

    if (!caseId) return next('403:No caseId');
    _model2.default.findOne({
      _id: caseId,
      user: req.user._id
    }).then(function (c) {
      if (c.progress == _progress.progressStatus['viewed']) {
        if (!c) return next('500:No Case For You');
        // update viewing counts
        // in order to analyze how many times users check but not yet start.
        _model2.default.findByIdAndUpdate(c._id, {
          $inc: { 'payload.viewed': 1 }
        }).then(function (c) {
          res.send(c);
        });
      }
    }).catch(next);
  }

  // switch (type) {
  //   case progressStatus['started']:
  //     break;
  //   case progressStatus['ordered']:
  //     break;
  //   case progressStatus['reviewed']:
  //     break;
  //   case progressStatus['payouted']:
  //     break;
  //   case progressStatus['finished']:
  //     break; 
  //   default:
  //     break;
  // }

};
//# sourceMappingURL=controller.js.map