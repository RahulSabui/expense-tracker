import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import clientPromise from '@/db/mongodb';

const SECRET_KEY = 'asasasas'; // Replace with an environment variable

export async function POST(req) {
    try {
      const { email, password } = await req.json();
      
      if (!email || !password) {
        return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
      }
      
      const client = await clientPromise;
      const db = client.db('expense-tracker');
      const user = await db.collection('users').findOne({ email });
      
      if (!user) {
        return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
      }
      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
      }
      
      const token = jwt.sign({ userId: user._id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
      return NextResponse.json({ success: true, token }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }