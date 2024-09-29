import connectMongoDB from '../../libs/mongodb';
import Record from '../../models/record';
import { NextResponse } from 'next/server';

export async function POST(request) {
	try {
		const { title, description, date, isRecurring = false, recurrenceFrequency = 'monthly' } = await request.json();
  
		if (!title || !description || !date) {
			return NextResponse.json({ message: 'Title, description, and date are required' }, { status: 400 });
		}
	
		await connectMongoDB();
		const newRecord = await Record.create({ title, description, date, isRecurring, recurrenceFrequency });
	
		return NextResponse.json({ message: 'Record Created', record: newRecord }, { status: 201 });
	} catch (error) {
		console.error('Error creating record:', error.message);
		return NextResponse.json({ message: 'Error creating record' }, { status: 500 });
	}
  }

export async function GET() {
	await connectMongoDB();
	await Record.find();
	const records = await Record.find();
	return NextResponse.json({records});
}

export async function DELETE(request) {
	const id  = request.nextUrl.searchParams.get("id");
	await connectMongoDB();
	await Record.findByIdAndDelete(id); 
	return NextResponse.json({ message: "Record deleted" }, { status: 200 })
}