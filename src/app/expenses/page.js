import Layout from '@/components/Layout';
import ExpenseForm from '@/components/ExpenseForm';

export default function Expenses() {
  return (
    <Layout>
      <div className="p-10">
        <h1 className="text-2xl font-bold">Add Expense</h1>
        <ExpenseForm />
      </div>
    </Layout>
  );
}
