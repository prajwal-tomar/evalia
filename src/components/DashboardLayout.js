'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { Menu, X, Home, Settings, HelpCircle, LogOut, Bell } from 'lucide-react';

export default function DashboardLayout({ children, user }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const router = useRouter();
    const supabase = createClientComponentClient();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden">
            {/* Sidebar */}
            <aside
                className={`bg-gradient-to-b from-blue-800 to-teal-700 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:relative md:translate-x-0 transition duration-200 ease-in-out z-30`}
            >
                <div className="flex items-center justify-between px-4">
                    <span className="text-2xl font-semibold">Evalia</span>
                    <button onClick={toggleSidebar} className="md:hidden">
                        <X size={24} />
                    </button>
                </div>
                <nav className="space-y-2 px-4">
                    <Link href="/dashboard" className="flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700">
                        <Home size={20} />
                        <span>Dashboard</span>
                    </Link>
                    <Link href="/settings" className="flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700">
                        <Settings size={20} />
                        <span>Settings</span>
                    </Link>
                    <Link href="/help" className="flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700">
                        <HelpCircle size={20} />
                        <span>Help</span>
                    </Link>
                    <button
                        onClick={handleSignOut}
                        className="flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 hover:bg-red-600 w-full text-left bg-red-500 font-semibold mt-4"
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </nav>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top bar */}
                <header className="bg-white shadow-md z-20">
                    <div className="py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        <div className="flex items-center">
                            <button
                                onClick={toggleSidebar}
                                className="p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 md:hidden"
                            >
                                <Menu size={24} />
                            </button>
                            <h2 className="ml-4 font-semibold text-xl text-gray-800">Dashboard</h2>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                <span className="sr-only">View notifications</span>
                                <Bell size={24} />
                            </button>
                            <div className="relative">
                                <button className="flex items-center space-x-2 bg-gray-100 rounded-full py-1 px-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                    <img
                                        className="h-8 w-8 rounded-full"
                                        src={`https://ui-avatars.com/api/?name=${user?.full_name || 'User'}&background=random`}
                                        alt="User avatar"
                                    />
                                    <span className="text-sm font-medium text-gray-700">{user?.full_name || 'User'}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                    <div className="container mx-auto px-6 py-8">
                        {children}
                    </div>
                </main>
            </div>

            {/* Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}
        </div>
    );
}