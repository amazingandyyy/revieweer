import mongoose from 'mongoose';

// Define the model
const productSchema = new mongoose.Schema({
    title: String,
    link: String,
    buyers : []
})

// Export the model
export default mongoose.model('Product', productSchema);