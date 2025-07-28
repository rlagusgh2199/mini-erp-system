// src/components/Header.js
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("token");
        alert("로그아웃 되었습니다.");
        navigate("/login");
    };

    const navItems = [
        { to: "/", label: "통합" },
        { to: "/sales", label: "매출" },
        { to: "/inventory", label: "재고" },
        { to: "/expense", label: "지출" },
    ];

    return (
        <header className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center shadow">
            <div className="flex items-center space-x-8">
                {navItems.map(({ to, label }) => (
                    <Link
                        key={to}
                        to={to}
                        className={`text-lg font-medium transition ${
                            location.pathname === to
                                ? "text-yellow-300 underline"
                                : "hover:text-yellow-300"
                        }`}
                    >
                        {label}
                    </Link>
                ))}
            </div>
            <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
            >
                로그아웃
            </button>
        </header>
    );
}
