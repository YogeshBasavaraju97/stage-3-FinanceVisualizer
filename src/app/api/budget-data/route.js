import connectDB from '@/lib/mongodb';
import Budget from "@/models/budget";
import { Transaction } from "@/models/transaction";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  try {
    // 1. Fetch all budgets
    const budgets = await Budget.find({});

    // 2. Fetch total spent per category from Transactions
    const spending = await Transaction.aggregate([
      {
        $group: {
          _id: "$category",
          spent: { $sum: "$amount" },
        },
      },
    ]);

    // 3. Map and merge data
    const budgetData = budgets.map((budget) => {
      const matched = spending.find((s) => s._id === budget.category);
      return {
        category: budget.category,
        budget: budget.budget,
        spent: matched ? matched.spent : 0,
      };
    });

    return NextResponse.json(budgetData);
  } catch (error) {
    console.error("Failed to generate budget data:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
