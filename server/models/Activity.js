import mongoose from 'mongoose';

const ActivitySchema = new mongoose.Schema({
userId: mongoose.Schema.Types.ObjectId,
timeSpent: Number,
completed: Boolean,
createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Activity', ActivitySchema);