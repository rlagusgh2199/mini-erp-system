import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

export default function Mypage() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("로그인이 필요합니다.");
            navigate("/login");
        }
    }, [navigate]);

    return (
        <div>
            <Header />
            <div className="p-8 text-center">
                <h1 className="text-3xl font-bold">마이페이지</h1>
                <p className="mt-4">환영합니다! 로그인된 사용자입니다.</p>
            </div>
        </div>
    );
}