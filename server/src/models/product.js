import mongoose from 'mongoose';

// Define the model
const productSchema = new mongoose.Schema({
    basic_info: {
        imageURL: String,
        title: String,
        link: String,
        price: Number,
        seller: String,
        productId: {
            type: String,
            unique: true
        }
    },
    // buyer_list : [{
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'User',
    //     unique: true
    // }],
    end: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})

// Export the model
export default mongoose.model('Product', productSchema);
