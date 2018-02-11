import mongoose from 'mongoose';

// Define the model
const productSchema = new mongoose.Schema({
    title: String,
    keyword: String,
    link: String,
    buyers : [{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        unique: true
    }],
    images: String,
    screenshots: String,
    seller: String,
    endTime: Date // millisecond
})

// Export the model
export default mongoose.model('Product', productSchema);