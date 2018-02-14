import mongoose from 'mongoose';

// Define the model
const productSchema = new mongoose.Schema({
    basic_info: {
        imageURL: String,
        title: String,
        link: String,
        price: Number,
        seller: String
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
})

// Export the model
export default mongoose.model('Product', productSchema);