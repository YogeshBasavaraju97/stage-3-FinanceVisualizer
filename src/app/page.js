'use client';
import { useState, useEffect } from 'react';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import MonthlyBarChart from '@/components/MonthlyBarChart';
import CategoryPieChart from '@/components/CategoryPieChart';
import SummaryCards from '@/components/SummaryCard';
import { toast } from 'sonner';


export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [editTx, setEditTx] = useState(null);


  useEffect(() => {
    async function fetchTransactions() {
      try {
        const res = await fetch('/api/transactions');
        const data = await res.json();
        setTransactions(data);
      } catch (error) {
        console.error('Failed to fetch:', error);
      }
    }
    fetchTransactions();
  }, []);

  const handleSave = async (transaction) => {
    try {
      const method = editTx ? 'PUT' : 'POST';
      const url = editTx
        ? `/api/transactions/${editTx._id}`
        : '/api/transactions';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaction),
      });

      if (!res.ok) throw new Error('Request failed');
      editTx ?
        toast.success('Transaction updated successfully!') : toast.success('Transaction saved successfully!');

      const savedTx = await res.json();

      setTransactions((prev) =>
        editTx
          ? prev.map((t) => (t._id === savedTx._id ? savedTx : t))
          : [savedTx, ...prev]
      );
      setEditTx(null);
    } catch (error) {
      console.error('Save error:', error);
    }
  };


  const handleDelete = async (id) => {

    try {
      const res = await fetch(`/api/transactions/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Delete failed');
      if (res.ok) {
        setTransactions((prev) => prev.filter((t) => t._id !== id));
        setEditTx(null);
        toast.success('Transaction deleted successfully!');
      }

    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleEdit = (tx) => {
    setEditTx(tx);
  };

  return (


    <main className=" max-w-3xl mx-auto p-4">
      {/* <h1 className="text-2xl font-bold mb-4">Personal Finance Visualizer 💸</h1> */}
      <TransactionForm onAdd={handleSave} editing={editTx} />
      <SummaryCards transactions={transactions} />
      <div className='flex justify-between gap-3'>
        <div className='w-6/12'>
          <MonthlyBarChart transactions={transactions} /></div>
        <div className='w-6/12'>
          <CategoryPieChart transactions={transactions} />
        </div>
      </div>
      <TransactionList
        transactions={transactions}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </main>

  );
}
