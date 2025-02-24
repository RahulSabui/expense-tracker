import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import clientPromise from '@/db/mongodb';

const SECRET_KEY = 'asasasas'; // Replace with an environment variable

export async function POST(req) {
  try {
    const { name, phone, password } = await req.json();
    
    if (!name || !phone || !password) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db('expense-tracker');
    const existingUser = await db.collection('users').findOne({ phone });
    
    if (existingUser) {
      return NextResponse.json({ success: false, error: 'Phone Number already exists' }, { status: 400 });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.collection('users').insertOne({ name, phone, password: hashedPassword });
    
    return NextResponse.json({ success: true, data: result.insertedId }, { status: 201 });
  } catch (error) {
    console.log(error);
    
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

