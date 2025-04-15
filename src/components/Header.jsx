'use client';
import Link from 'next/link';

export default function Header() {
  return (
    <header className=" bg-black text-white h-16 sticky top-0 z-100 shadow-md w-full ">
      <div className="container mx-auto h-full flex justify-between items-center ">
        <h1 className="text-2xl font-bold">Finance Visualizer 💸</h1>
        <nav className="flex gap-4">
          <Link href="/" className="hover:underline underline-offset-4">Transactions</Link>
          <Link href="/budget" className="hover:underline underline-offset-4">Budgets</Link>
        </nav>
      </div>
    </header>
  );
};
