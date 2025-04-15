'use client';

import { Button } from "@/components/ui/button";

export default function TransactionList({ transactions, onDelete, onEdit }) {
  if (transactions.length === 0) return <p className="text-gray-500">No transactions yet.</p>;

  return (
    <div className="mt-4 space-y-2">
      {transactions.map((tx) => (
        <div
          key={tx.id}
          className="flex justify-between items-center bg-white rounded-xl p-4 shadow-md"
        >
          <div>
            <p className="font-semibold text-gray-800">{tx.description}</p>
            <p className="text-sm text-gray-500">
              ₹ {tx.amount} • {tx.category} • {new Date(tx.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              })}
            </p>
          </div>
          <div className="space-x-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(tx)}>
              Edit
            </Button>
            <Button variant="destructive" size="sm" onClick={() => onDelete(tx._id)}>
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
