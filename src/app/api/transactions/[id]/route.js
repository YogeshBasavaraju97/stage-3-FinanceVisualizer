import connectDB from '@/lib/mongodb';
import { Transaction } from '@/models/transaction';
import { NextResponse } from 'next/server';


export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { description, amount, date, category } = body;

    if (!description || !amount || !date || !category) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    await connectDB();
    const updated = await Transaction.findByIdAndUpdate(id, {
      description, amount, date, category,
    }, { new: true });

    if (!updated) {
      return NextResponse.json({ message: 'Transaction not found' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ message: 'Failed to update transaction', error: error.message }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  try {
    const { id } = await params;

    await connectDB();
    const deleted = await Transaction.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ message: 'Transaction not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete transaction', error: error.message }, { status: 500 });
  }
}
