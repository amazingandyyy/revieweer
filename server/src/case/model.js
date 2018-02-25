import mongoose from 'mongoose';
import {progressStatus} from './progress';

const payloadSchema = new mongoose.Schema({
	viewed: {
		type: Number,
		default: 1
	},
	started: {
		at: Date
	},
	ordered: {
		at: Date,
		screenshot: String,
		orderNumber: {
				type: String
		}
	},
	reviewed: {
		at: Date
	},
	payouted: {
		at: Date
	},
	finished: {
		at: Date
	}
})

// Define the model
const caseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product'
    },
    payload: payloadSchema,
    progress: {
        type : String,
        required: true, 
        default: 'viewed',
        enum : Object.values(progressStatus) 
        // ["viewed", "started", "ordered", "reviewed", "payouted", "finished"]
    }
},{
    timestamps: true
})

// Export the model
export default mongoose.model('Case', caseSchema);
