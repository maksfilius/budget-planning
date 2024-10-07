import mongoose, { Schema } from 'mongoose';

const expenseSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
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

const Expense = mongoose.models.Expense || mongoose.model('Expense', expenseSchema);

export default Expense;