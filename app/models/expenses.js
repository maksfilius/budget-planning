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
        }
    },
    {
        timestamps: true,
    }
);

const Expense = mongoose.models.Expense || mongoose.model('Expense', expenseSchema);

export default Expense;