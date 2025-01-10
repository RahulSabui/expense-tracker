import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div>
      <header className="bg-gray-800 text-white p-4">
        <nav className="space-x-4">
          <Link href="/">Dashboard</Link>
          <Link href="/expenses">Expenses</Link>
          <Link href="/customers">Customers</Link>
        </nav>
      </header>
      <main className="p-4">{children}</main>
    </div>
  );
}
