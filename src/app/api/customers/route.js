import { NextResponse } from 'next/server';
import clientPromise from '@/db/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('expense-tracker');
    const customers = await db.collection('customers').find({}).toArray();

    return NextResponse.json({ success: true, data: customers }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { name, balance } = await req.json();

    if (!name || balance === undefined) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('expense-tracker');

    const result = await db.collection('customers').insertOne({
      name,
      balance,
    });

    return NextResponse.json({ success: true, data: result.insertedId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
