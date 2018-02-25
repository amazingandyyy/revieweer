'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _progress = require('./progress');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var payloadSchema = new _mongoose2.default.Schema({
	viewed: {
		type: Number,
		default: 1
	},
	started: {
		at: Date
	},
	ordered: {
		at: Date,
		screenshot: String,
		orderNumber: {
			type: String
		}
	},
	reviewed: {
		at: Date
	},
	payouted: {
		at: Date
	},
	finished: {
		at: Date
	}
});

// Define the model
var caseSchema = new _mongoose2.default.Schema({
	user: {
		type: _mongoose2.default.Schema.ObjectId,
		ref: 'User'
	},
	product: {
		type: _mongoose2.default.Schema.ObjectId,
		ref: 'Product'
	},
	payload: payloadSchema,
	progress: {
		type: String,
		required: true,
		default: 'viewed',
		enum: Object.values(_progress.progressStatus)
		// ["viewed", "started", "ordered", "reviewed", "payouted", "finished"]
	}
}, {
	timestamps: true
});

// Export the model
exports.default = _mongoose2.default.model('Case', caseSchema);
//# sourceMappingURL=model.js.map