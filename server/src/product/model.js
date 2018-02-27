import mongoose from 'mongoose';

// Define the model
const productSchema = new mongoose.Schema({
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
    },
    createBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    reviews: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Review'
    }]
},{
    timestamps: true
})

productSchema.statics.findOneByProductId = (productId) => {
    return Product.findOne({
        productId: productId
    })
}

// Export the model
const Product = mongoose.model('Product', productSchema);


export default Product