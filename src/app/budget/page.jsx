
'use client';
import { Button } from "@/components/ui/button";
import { useState, useEffect } from 'react';
import { categories } from "@/components/TransactionForm";

import BudgetComparisonChart from "@/components/budget/BudgetComparisonChart";
import { toast } from "sonner";

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState([]);
  const [formData, setFormData] = useState({ category: '', budget: '' });
  const [budgetData, setBudgetData] = useState([]);

  const totalBudget = budgets.reduce((acc, curr) => acc += curr.budget, 0);
  const totalSpent = budgetData.reduce((acc, curr) => acc += curr.spent, 0);
  console.log(totalBudget, totalSpent);

  const fetchBudgets = async () => {
    const res = await fetch('/api/budgets');
    const data = await res.json();
    if (res.ok) {
      setBudgets(data);
    }
  };

  useEffect(() => {
    fetchBudgets();
    fetchBudgetData();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const categoryExist = budgets.some(budget => budget.category === formData.category);

    if (categoryExist) {
      console.log("category existed");
      try {
        const res = await fetch('/api/budgets', {
          method: 'PUT',
          body: JSON.stringify(formData),
          headers: { 'content-Type': 'application/json' }
        });
        if (res.ok) {
          fetchBudgets();
          fetchBudgetData();
          setFormData({ category: '', budget: '' });
        }


      } catch (error) {
        toast.error("something went wrong");
      }
    }
    if (!categoryExist) {

      try {

        const res = await fetch('/api/budgets', {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {
          setFormData({ category: '', budget: '' });
          fetchBudgets();
          fetchBudgetData();

        }

      } catch (error) {
        toast.error("something went wrong");

      }

    }

  };
  const fetchBudgetData = async () => {

    const res = await fetch('/api/budget-data');
    const data = await res.json();
    if (res.ok) {
      setBudgetData(data);
    }

  };

  return (
    <main className="max-w-3xl mx-auto p-4 bg-white rounded-xl shadow-md border">
      <h1 className="text-2xl font-bold mb-6">📊 Budget Manager</h1>

      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2 mb-6">
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          required
          className="border p-2 rounded"
        >
          <option value="" disabled> select a category</option>
          {categories.map((category) => (<option key={category} value={category}>{category}</option>))}
        </select>

        <input
          name="budget"
          type="number"
          value={formData.budget}
          onChange={handleChange}
          placeholder="Budget"
          required
          className="border p-2 rounded"
        />
        <Button
          type="submit"
          className="col-span-2 text-white py-2 rounded hover:opacity-90"
        >
          Save Budget
        </Button>
      </form>
      <BudgetComparisonChart data={budgetData} />

      <div className="bg-white p-6 rounded-2xl shadow-md mt-4 space-y-6 text-2xl">
        <p>
          {totalBudget > totalSpent ? (
            <span className="text-green-500">You're under budget by ₹{totalBudget - totalSpent} 🎉</span>
          ) : (
            <span className="text-red-500">You've exceeded your budget by ₹{totalSpent - totalBudget} ⚠️</span>
          )}
        </p>
      </div>

      <h2 className="text-lg font-semibold mt-5 mb-2">Current Budgets</h2>
      <ul className="space-y-2">
        {budgets.length === 0 ? (
          <p className="text-gray-500">No budgets yet.</p>
        ) : (
          budgets.map((budget) => (
            <li
              key={budget._id}
              className="flex justify-between border px-3 py-2 bg-gray-100 rounded"
            >
              <span className="capitalize">{budget.category}</span>
              <span>₹{budget.budget}</span>
            </li>
          ))
        )}
      </ul>

    </main>
  );
}
