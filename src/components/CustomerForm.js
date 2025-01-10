"use client"
import { useState } from 'react';

export default function CustomerForm() {
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const customerData = { name, balance: parseFloat(balance) };

    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      });

      if (!response.ok) {
        throw new Error('Failed to add customer');
      }

      const data = await response.json();
    //   onAddCustomer(data); // If the backend returns the added customer, pass it to parent
      setName('');
      setBalance('');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 bg-white shadow rounded">
      <div className="mb-2">
        <label className="block text-sm font-bold mb-1">Name</label>
        <input
          type="text"
          className="w-full border px-2 py-1 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-bold mb-1">Balance</label>
        <input
          type="number"
          className="w-full border px-2 py-1 rounded"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button 
        type="submit" 
        className={`bg-blue-600 text-white px-4 py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        {loading ? 'Adding...' : 'Add Customer'}
      </button>
    </form>
  );
}
