'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _raven = require('raven');

var _raven2 = _interopRequireDefault(_raven);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _routers = require('./routers');

var _routers2 = _interopRequireDefault(_routers);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
_raven2.default.config(_config2.default.sentryDSN).install();
app.use(_raven2.default.requestHandler());

// DB Setup
_mongoose2.default.connect(_config2.default.mongoose.uri).catch(function (err) {
    return console.error(err);
});

_mongoose2.default.Promise = global.Promise;

// App Setup
app.use((0, _cors2.default)());
app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use('/', _routers2.default);
app.use(errorHandler);
if (process.env.NODE_ENV == 'production') {
    app.use(_express2.default.static(_path2.default.resolve(__dirname, '../../docs')));
    app.get('/*', function (req, res) {
        res.sendFile(_path2.default.join('index.html'));
    });
}

function errorHandler(err, req, res, next) {
    console.log('errrrr', err);
    var error = typeof err == 'string' && err.search(':') > 0 ? err.split(':') : err;

    var _ref = error.length > 1 ? error : [500, err],
        _ref2 = _slicedToArray(_ref, 2),
        statusCode = _ref2[0],
        msg = _ref2[1];

    res.headersSent ? next(msg) : res.status(statusCode).send(msg);
}
app.use(_raven2.default.errorHandler());

// Server Setup
var port = process.env.PORT || 8000;
(0, _http.createServer)(app).listen(port, function () {
    console.log('\x1B[32m', '> Server listening on ' + port, '\x1B[0m');
});
//# sourceMappingURL=server.js.map