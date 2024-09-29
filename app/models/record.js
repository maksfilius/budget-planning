import mongoose, { Schema } from 'mongoose';

const recordSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        date: {
            type: Date,
            required: true,
        },
        isRecurring: {
            type: Boolean,
            default: false,
        },
        recurrenceFrequency: {
            type: String,
            enum: ['daily', 'weekly', 'monthly', 'yearly'],
            default: 'monthly',
        },
    },
    {
        timestamps: true,
    }
);

const Record = mongoose.models.Record || mongoose.model('Record', recordSchema);

export default Record;
