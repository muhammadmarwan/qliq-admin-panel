"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaUsers, FaBoxOpen, FaShoppingCart, FaChartBar, FaSignOutAlt, FaTimes } from 'react-icons/fa';

interface SidebarProps {
  onClose: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <aside className="fixed top-0 left-0 w-64 h-full bg-gray-800 text-gray-100 flex flex-col z-50 shadow-lg">
      <div className="flex items-center justify-between p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold">QLIQ Admin</h1>
        <button
          onClick={onClose}
          aria-label="Close sidebar"
          className="text-gray-300 hover:text-white focus:outline-none"
        >
          <FaTimes size={20} />
        </button>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2 flex flex-col">
        <Link href="/dashboard" className="flex items-center gap-3 p-3 rounded hover:bg-gray-700">
          <FaChartBar />
          Dashboard
        </Link>
        <Link href="/dashboard/users" className="flex items-center gap-3 p-3 rounded hover:bg-gray-700">
          <FaUsers />
          Users
        </Link>
        <Link href="/dashboard/products" className="flex items-center gap-3 p-3 rounded hover:bg-gray-700">
          <FaBoxOpen />
          Products
        </Link>
        <Link href="/dashboard/orders" className="flex items-center gap-3 p-3 rounded hover:bg-gray-700">
          <FaShoppingCart />
          Orders
        </Link>

        {/* Push logout to bottom */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 rounded hover:bg-gray-700 mt-auto w-full text-left"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </nav>
    </aside>
  );
}
