'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Define the model
var userSchema = new _mongoose2.default.Schema({
    name: {
        first: {
            type: String,
            validate: {
                validator: function validator(name) {
                    return name.length > 2;
                },
                message: 'Name must be longer than 2 characters.'
            },
            required: [true, 'first name is required.']
        },
        last: {
            type: String,
            validate: {
                validator: function validator(name) {
                    return name.length > 2;
                },
                message: 'Name must be longer than 2 characters.'
            }
        }
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required.'],
        lowercase: true
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    password: String,
    phone: {
        number: {
            type: String
        },
        verified: {
            type: Boolean,
            default: false
        }
    }
}, {
    timestamps: true
});

userSchema.pre('save', function (next) {
    var user = this;
    _bcryptNodejs2.default.genSalt(10, function (error, salt) {
        if (error) return next(error);
        _bcryptNodejs2.default.hash(user.password, salt, null, function (err, crypt) {
            if (err) return next(err);
            user.password = crypt;
            next();
        });
    });
});

// Make use of methods for comparedPassword
userSchema.methods.comparedPassword = function (p, cb) {
    _bcryptNodejs2.default.compare(p, this.password, function (err, good) {
        err ? cb(err) : cb(null, good);
    });
};

// Export the model
exports.default = _mongoose2.default.model('User', userSchema);
//# sourceMappingURL=user.js.map