"use client"
import { useState } from 'react';

export default function ExpenseForm() {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const expense = {
      description,
      amount,
      date,
    };

    const response = await fetch('/api/expenses', {  // Assuming this is the correct API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expense),
      });
  
    const data = await response.json();
    if (data.success) {
      // Optionally reset the form after successful submission
      setDescription('');
      setAmount('');
      setDate('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 bg-white shadow rounded">
      <div className="mb-2">
        <label className="block text-sm font-bold mb-1">Description</label>
        <input
          type="text"
          className="w-full border px-2 py-1 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-bold mb-1">Amount</label>
        <input
          type="number"
          className="w-full border px-2 py-1 rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-bold mb-1">Date</label>
        <input
          type="date"
          className="w-full border px-2 py-1 rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Expense
      </button>
    </form>
  );
}
