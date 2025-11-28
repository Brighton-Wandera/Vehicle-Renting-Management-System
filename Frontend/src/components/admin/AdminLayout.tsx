import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import AdminSidebar from './AdminSidebar';

interface AdminLayoutProps {
    children: React.ReactNode;
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, activeTab, setActiveTab }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            <AdminSidebar
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            {/* Main Content */}
            <div className="lg:pl-64 min-h-screen flex flex-col transition-all duration-300">
                {/* Mobile Header */}
                <div className="lg:hidden h-16 border-b border-white/10 flex items-center px-4 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-30">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 -ml-2 text-gray-400 hover:text-white"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <span className="ml-3 font-bold text-lg">Admin Dashboard</span>
                </div>

                {/* Content Area */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
