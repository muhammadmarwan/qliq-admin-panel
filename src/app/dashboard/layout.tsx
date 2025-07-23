"use client";

import { ReactNode, useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/Sidebar";
import { FaBars } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { toast, Toaster } from 'sonner';
import socket from "@/lib/socket";

function formatPageName(pathname: string) {
  const path = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  const lastSegment = path.split('/').pop() || 'Dashboard';

  return lastSegment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const sidebarWidth = 256;

  const pathname = usePathname();
  const pageName = formatPageName(pathname || '');

  useEffect(() => {
    const handleUserTreeUpdate = () => {
      console.log("📢 Toast should appear");
      toast.success("A new user joined the MLM tree!");
    };

    socket.on("userTreeUpdated", handleUserTreeUpdate);

    return () => {
      socket.off("userTreeUpdated", handleUserTreeUpdate);
    };
  }, []);

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        {sidebarOpen && <Sidebar onClose={() => setSidebarOpen(false)} />}
        <div
          className="flex-1 flex flex-col transition-margin duration-300"
          style={{
            marginLeft: sidebarOpen ? sidebarWidth : 0,
          }}
        >
          <header className="fixed top-0 left-0 right-0 z-50 bg-gray-800 text-gray-100 p-4 flex items-center"
            style={{
              marginLeft: sidebarOpen ? sidebarWidth : 0,
              height: '64px',
            }}
          >
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                aria-label="Open sidebar"
                className="text-gray-100 hover:text-white focus:outline-none"
              >
                <FaBars size={24} />
              </button>
            )}
            <h2 className="ml-4 text-xl font-semibold">{pageName}</h2>
          </header>

          {/* Main content with top padding */}
          <main className="flex-1 p-6 pt-[80px] bg-gray-50 dark:bg-gray-900">
            {children}
          </main>
        </div>
      </div>

      <Toaster richColors position="top-center" />
    </ProtectedRoute>

  );
}