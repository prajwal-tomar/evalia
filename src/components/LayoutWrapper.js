'use client'

import { usePathname } from 'next/navigation';
import DashboardLayout from './DashboardLayout';

export default function LayoutWrapper({ children }) {
    const pathname = usePathname();

    const isPublicRoute = ['/', '/login', '/signup'].includes(pathname);

    if (isPublicRoute) {
        return children;
    }

    return <DashboardLayout>{children}</DashboardLayout>;
}