// src/components/Sidebar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaChartBar, FaBox, FaMoneyBillWave, FaHome } from 'react-icons/fa';

function Sidebar() {
    const location = useLocation();

    const navItems = [
        { to: "/", label: "통합", icon: <FaHome /> },
        { to: "/sales", label: "매출", icon: <FaChartBar /> },
        { to: "/inventory", label: "재고", icon: <FaBox /> },
        { to: "/expense", label: "지출", icon: <FaMoneyBillWave /> },
    ];

    return (
        <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col">
            <div className="p-6 text-2xl font-bold border-b border-gray-700">📊 ERP 시스템</div>
            <nav className="flex-1 px-4 py-6 space-y-2">
                {navItems.map(({ to, label, icon }) => (
                    <Link
                        key={to}
                        to={to}
                        className={`flex items-center px-3 py-2 rounded-md transition 
                            ${location.pathname === to ? "bg-gray-700 font-semibold" : "hover:bg-gray-700"}`}
                    >
                        <span className="mr-2 text-lg">{icon}</span>
                        {label}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}

export default Sidebar;
