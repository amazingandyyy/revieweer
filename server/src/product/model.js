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
    productId: {
        type: String,
        unique: true
    }
},{
    timestamps: true
})

// Export the model
export default mongoose.model('Product', productSchema);
