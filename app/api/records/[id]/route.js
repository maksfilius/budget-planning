import connectMongoDB from "../../../libs/mongodb";
import Record from "../../../models/record";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const { newTitle: title, newDescription: description } = await request.json();
    await connectMongoDB();
    await Record.findByIdAndUpdate(id, { title, description });
    return NextResponse.json({ message: "Record updated" }, { status: 200 });
}

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const record = await Record.findOne({_id: id});
    return NextResponse.json({ record }, { status: 200 })
}