import mongoose from 'mongoose';

// Define the model
const caseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        unique: true
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        unique: true
    },
    timestamps: {
        visit: {
            at: Date
        },
        startAt: Date,
        ordered: {
            at: Date,
            screenshot: String
        },
        reviewedAt: {
            at: Date
        },
        payoutAt: Date,
        finishedAt: Date
    },
    progress: {
        type : String, 
        enum : [ 'visit', 'start', 'ordered', 'reviewed', 'payout', 'finished' ] 
    }
},{
    timestamps: true
})

// Export the model
export default mongoose.model('Case', caseSchema);
