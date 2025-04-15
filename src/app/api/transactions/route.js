import { NextResponse, NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Transaction } from '@/models/transaction';



export async function GET() {
  try {
    await connectDB();
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    return NextResponse.json(transactions);
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch transactions', error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    console.log(request.body);
    const body = await request.json();

    const { description, amount, date, category } = body;

    if (!description || !amount || !date || !category) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    await connectDB();
    const newTransaction = await Transaction.create({ description, amount, date, category });

    return NextResponse.json(newTransaction, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to create transaction', error: error.message }, { status: 500 });
  }
}

