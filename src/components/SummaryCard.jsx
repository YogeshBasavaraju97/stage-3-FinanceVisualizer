'use client';

export default function SummaryCards({ transactions }) {
  if (transactions.length === 0) return null;

  const total = transactions.reduce((acc, tx) => acc + parseFloat(tx.amount), 0);

  const categories = transactions.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + parseFloat(tx.amount);
    return acc;
  }, {});


  const recent = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);


  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h3 className="text-sm text-gray-500">Total Expenses</h3>
        <p className="text-2xl font-bold text-red-500">₹{total.toFixed(2)}</p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h3 className="text-sm text-gray-500">Category Breakdown</h3>

        {Object.entries(categories).map(([category, expense]) => (<div className="flex gap-1" key={category}><p>{category}:</p> <p>{"₹" + expense}</p></div>))}

      </div>
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h3 className="text-sm text-gray-500">Most Recent</h3>
        <p className="text-sm text-gray-400"></p>
        {recent.map((tx) => (
          <div className=" flex gap-2" key={tx._id}>
            <p className="overflow-hidden w-10">{tx.description}</p>
            <p> {new Date(tx.date).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
            })} </p>
            <p> ₹{tx.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
