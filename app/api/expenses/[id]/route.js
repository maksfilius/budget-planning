import connectMongoDB from "../../../libs/mongodb";
import Expense from "../../../models/expense";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const { newTitle: title, newDescription: description } = await request.json();
    await connectMongoDB();
    await Expense.findByIdAndUpdate(id, { title, description });
    return NextResponse.json({ message: "Expense updated" }, { status: 200 });
}

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const expenses = await Expense.findOne({ _id: id });
    return NextResponse.json({ expenses }, { status: 200 });
}