import connectMongoDB from '../../libs/mongodb';
import Expense from '../../models/expenses';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { title, description } = await request.json();

        if (!title || !description) {
            return NextResponse.json({ message: 'Title and description are required' }, { status: 400 });
        }

        await connectMongoDB();
        const newExpense = await Expense.create({ title, description });

        return NextResponse.json({ message: 'Expense Created', expense: newExpense }, { status: 201 });
    } catch (error) {
        console.error('Error creating expense:', error.message);
        return NextResponse.json({ message: 'Error creating expense' }, { status: 500 });
    }
}

export async function GET() {
  await connectMongoDB();
  await Expense.find();
  const expenses = await Expense.find();
  return NextResponse.json({expenses});
}

export async function DELETE(request) {
  const id  = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Expense.findByIdAndDelete(id); 
  return NextResponse.json({ message: "Record deleted" }, { status: 200 })
}
