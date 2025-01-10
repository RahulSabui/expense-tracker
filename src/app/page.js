"use client"
import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';

export default function Home() {
  const [mockExpenses, setmockExpenses] = useState([]);
  const [mockCustomers, setmmockCustomers] = useState([]);

  // State to store calculated totals
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [moneyTakenGiven, setMoneyTakenGiven] = useState(0);

  useEffect(() => {
    const fetchExpenseData = async () => {
      try {
        const response = await fetch('/api/expenses', {
          method: 'GET', // Assuming GET request for fetching expenses
        });

        if (response.ok) {
          const data = await response.json();
          setmockExpenses(data.data); // Set the fetched data to the state

          // Calculate total expenses
          const total = data.data.reduce((acc, expense) => acc + Number(expense.amount), 0);
          setTotalExpenses(total); // Update total expenses state
        } else {
          console.error('Failed to fetch expenses');
        }
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    const fetchCustomerData = async () => {
      try {
        const response = await fetch('/api/customers', {
          method: 'GET', // Assuming GET request for fetching customers
        });

        if (response.ok) {
          const data = await response.json();
          setmmockCustomers(data.data); // Set the fetched data to the state

          // Calculate money taken/given
          const totalMoney = data.data.reduce((acc, customer) => acc + parseInt(customer.balance), 0);
          setMoneyTakenGiven(totalMoney); // Update money taken/given state
        } else {
          console.error('Failed to fetch customers');
        }
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchExpenseData();
    fetchCustomerData();
  }, []);

  return (
    <Layout>
      <div className="p-10">
        <h1 className="text-3xl font-bold text-center mb-10">Expense Tracker Dashboard</h1>

        {/* Total Summary */}
        <div className="flex justify-between items-center bg-blue-500 text-white p-4 rounded-lg shadow-md mb-10">
          <div>
            <h2 className="text-xl font-bold">Total Expenses</h2>
            <p className="text-lg">Rs {totalExpenses}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Money Taken/Given</h2>
            <p className="text-lg">Rs {moneyTakenGiven}</p>
          </div>
        </div>

        {/* Recent Expenses */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Recent Expenses</h2>
          <table className="min-w-full border-collapse border border-gray-200 bg-white shadow-lg">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                <th className="p-4 border border-gray-200">Date</th>
                <th className="p-4 border border-gray-200">Description</th>
                <th className="p-4 border border-gray-200">Amount</th>
              </tr>
            </thead>
            <tbody>
              {mockExpenses.map((expense, index) => (
                <tr key={expense.id || index} className="hover:bg-gray-50">
                  <td className="p-4 border border-gray-200">{expense.date}</td>
                  <td className="p-4 border border-gray-200">{expense.description}</td>
                  <td className="p-4 border border-gray-200">Rs {expense.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Customer Balances */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Customer Balances</h2>
          <table className="min-w-full border-collapse border border-gray-200 bg-white shadow-lg">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                <th className="p-4 border border-gray-200">Customer</th>
                <th className="p-4 border border-gray-200">Balance</th>
              </tr>
            </thead>
            <tbody>
              {mockCustomers.map((customer, index) => (
                <tr key={customer.id || index} className="hover:bg-gray-50">
                  <td className="p-4 border border-gray-200">{customer.name}</td>
                  <td
                    className={`p-4 border border-gray-200 ${customer.balance < 0 ? 'text-red-500' : 'text-green-500'}`}
                  >
                    Rs {customer.balance}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
