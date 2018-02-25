'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Define the model
var productSchema = new _mongoose2.default.Schema({
    details: {
        imageURL: String,
        title: String,
        link: String,
        price: Number,
        seller: String
    },
    benefits: {
        notes: String,
        cashback: Number,
        rewards: Number
    },
    end: {
        type: Boolean,
        default: false
    },
    endAt: {
        type: Date
    },
    productId: {
        type: String,
        unique: true
    }
}, {
    timestamps: true
});

productSchema.statics.findOneByProductId = function (productId) {
    console.log('productId');
    return Product.findOne({
        productId: productId
    });
};

// Export the model
var Product = _mongoose2.default.model('Product', productSchema);

exports.default = Product;
//# sourceMappingURL=model.js.map