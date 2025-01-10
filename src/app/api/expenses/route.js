import { NextResponse } from 'next/server';
import clientPromise from '@/db/mongodb';


// Handle GET and POST
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('expense-tracker');
    const expenses = await db.collection('expenses').find({}).toArray();

    return NextResponse.json({ success: true, data: expenses }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { description, amount, date } = await req.json();

    if (!description || !amount || !date) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('expense-tracker');

    const result = await db.collection('expenses').insertOne({
      description,
      amount,
      date,
    });
    // console.log(result, "res");
    
    return NextResponse.json({ success: true, data: result.insertedId }, { status: 201 });
  } catch (error) {
    console.log(error);
    
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
