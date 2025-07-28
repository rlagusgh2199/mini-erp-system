import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

function Layout({ children }) {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1">
                <Header />
                <main className="p-6 bg-gray-50 min-h-screen">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default Layout;
