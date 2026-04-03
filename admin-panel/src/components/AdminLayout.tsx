"use client";
import React from 'react';
import Sidebar from './Sidebar';
import AdminHeader from './AdminHeader';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden selection:bg-primary-100 selection:text-primary-900 font-sans antialiased">
      {/* Sidebar - Fixed/Sticky via component */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header - Fixed/Sticky Top */}
        <AdminHeader />

        {/* Dynamic Page Content - Scrollable Main */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto pb-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
