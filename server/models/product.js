import mongoose from 'mongoose';

// Define the model
const productSchema = new mongoose.Schema({
    title: String,
    link: String,
    buyers : [],
    images: String,
    screenshots: String,
    seller: String,
    endTime: Date // millisecond
})

// Export the model
export default mongoose.model('Product', productSchema);