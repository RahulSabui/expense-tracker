import Layout from '@/components/Layout';
import CustomerForm from '@/components/CustomerForm';

export default function Customers() {
  return (
    <Layout>
      <div className="p-10">
        <h1 className="text-2xl font-bold">Manage Customers</h1>
        <CustomerForm />
      </div>
    </Layout>
  );
}
