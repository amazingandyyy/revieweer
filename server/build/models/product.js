'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Define the model
var productSchema = new _mongoose2.default.Schema({
    basic_info: {
        imageURL: String,
        title: String,
        link: String,
        price: Number,
        seller: String
    },
    productId: {
        type: String,
        unique: true
    },
    end: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Export the model
exports.default = _mongoose2.default.model('Product', productSchema);
//# sourceMappingURL=product.js.map