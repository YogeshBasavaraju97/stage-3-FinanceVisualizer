import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Budget from '@/models/budget';

// Get all budgets
export async function GET() {
  try {
    await connectDB();

    const budgets = await Budget.find();
    return NextResponse.json(budgets);
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch budgets', error: error.message }, { status: 500 });
  }
}

// Create a new budget
export async function POST(req) {

  try {
    await connectDB();
    const { category, budget } = await req.json();

    if (!category || !budget) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const newBudget = await Budget.create({ category, budget });
    return NextResponse.json(newBudget, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to create budget', error: error.message }, { status: 500 });
  }
}

// Update an existing budget
export async function PUT(req) {
  try {
    await connectDB();
    const { category, budget } = await req.json();

    const updatedBudget = await Budget.findOneAndUpdate(
      { category },
      { budget },
      { new: true }
    );

    if (!updatedBudget) {
      return NextResponse.json({ message: 'Budget not found' }, { status: 404 });
    }

    return NextResponse.json(updatedBudget);
  } catch (error) {
    return NextResponse.json({ message: 'Failed to update budget', error: error.message }, { status: 500 });
  }
}

