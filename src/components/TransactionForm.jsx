import { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


export const categories = ['Food', 'Transport', 'Rent', 'Entertainment', 'Shopping', 'miscellaneous'];

export default function TransactionForm({ onAdd, editing }) {
  const [form, setForm] = useState({
    amount: '',
    date: '',
    description: '',
    category: categories[0],
  });

  useEffect(() => {
    if (editing) {
      console.log("editing");

      const updatedEditing = {
        ...editing,
        date: new Date(editing.date).toISOString().split("T")[0],
      };
      setForm(updatedEditing);
    } else {

      setForm({
        amount: '',
        date: '',
        description: '',
        category: categories[0],
      });
    }
  }, [editing]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.amount || !form.date || !form.description || !form.category) return;
    onAdd(form);
    setForm({ amount: '', date: '', description: '', category: categories[0] });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-xl shadow-md">
        <Input type="number" name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} required />
        <Input type="date" name="date" value={form.date} onChange={handleChange} required />
        <Input type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <select name="category" value={form.category} onChange={handleChange} className="w-full border rounded p-2">
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <Button type="submit">{editing ? 'Update' : 'Add'} Transaction</Button>
      </form>


    </>
  );
}
