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
        }
    },
    {
        timestamps: true,
    }
);

const Record = mongoose.models.Record || mongoose.model('Record', recordSchema);

export default Record;