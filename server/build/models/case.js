'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Define the model
var caseSchema = new _mongoose2.default.Schema({
    user: {
        type: _mongoose2.default.Schema.ObjectId,
        ref: 'User',
        unique: true
    },
    product: {
        type: _mongoose2.default.Schema.ObjectId,
        ref: 'Product',
        unique: true
    },
    timestamps: {
        visit: {
            at: Date
        },
        startAt: Date,
        ordered: {
            at: Date,
            screenshot: String
        },
        reviewedAt: {
            at: Date
        },
        payoutAt: Date,
        finishedAt: Date
    },
    progress: {
        type: String,
        enum: ['visit', 'start', 'ordered', 'reviewed', 'payout', 'finished']
    }
}, {
    timestamps: true
});

// Export the model
exports.default = _mongoose2.default.model('Case', caseSchema);
//# sourceMappingURL=case.js.map