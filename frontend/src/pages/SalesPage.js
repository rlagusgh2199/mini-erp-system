import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../api';

function SalesPage() {
    const [salesData, setSalesData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split("T")[0];
    });
    const [form, setForm] = useState({ item: '', price: '', amount: '' });
    const [editingId, setEditingId] = useState(null); // 수정 모드 ID

    useEffect(() => {
        if (selectedDate) {
            fetchSales();
        }
    }, [selectedDate]);

    const fetchSales = () => {
        api.get(`/sales/date/${selectedDate}`)
            .then((res) => setSalesData(res.data))
            .catch((err) => console.error('매출 데이터 호출 실패:', err));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedDate) {
            alert("먼저 날짜를 선택하세요!");
            return;
        }

        const sale = {
            item: form.item,
            price: parseInt(form.price),
            amount: parseInt(form.amount),
            total: parseInt(form.price) * parseInt(form.amount),
            date: selectedDate
        };

        if (editingId) {
            api.put(`/sales/${editingId}`, sale)
                .then(() => {
                    resetForm();
                    fetchSales();
                })
                .catch((err) => console.error("수정 실패:", err));
        } else {
            api.post('/sales', sale)
                .then(() => {
                    resetForm();
                    fetchSales();
                })
                .catch((err) => console.error('등록 실패:', err));
        }
    };

    const handleEdit = (sale) => {
        setForm({ item: sale.item, price: sale.price, amount: sale.amount });
        setEditingId(sale.id);
    };

    const handleDelete = (id) => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            api.delete(`/sales/${id}`)
                .then(() => fetchSales())
                .catch((err) => console.error("삭제 실패:", err));
        }
    };

    const resetForm = () => {
        setForm({ item: '', price: '', amount: '' });
        setEditingId(null);
    };

    return (
        <Layout>
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-center">매출 현황판</h2>

                {/* 날짜 선택 */}
                <div className="mb-6 text-center">
                    <label className="mr-2 font-semibold">날짜 선택:</label>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="border px-2 py-1 rounded"
                    />
                </div>

                <div className="grid grid-cols-3 gap-6">
                    {/* 테이블 */}
                    <div className="col-span-2">
                        <table className="w-full border text-center">
                            <thead className="bg-gray-700 text-white">
                            <tr>
                                <th className="border px-2 py-2">품목</th>
                                <th className="border px-2 py-2">단가</th>
                                <th className="border px-2 py-2">수량</th>
                                <th className="border px-2 py-2">총액</th>
                                <th className="border px-2 py-2">기능</th>
                            </tr>
                            </thead>
                            <tbody>
                            {salesData.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="border px-2 py-2">{item.item}</td>
                                    <td className="border px-2 py-2">{item.price.toLocaleString()}원</td>
                                    <td className="border px-2 py-2">{item.amount}</td>
                                    <td className="border px-2 py-2">{item.total.toLocaleString()}원</td>
                                    <td className="border px-2 py-2 space-x-2">
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded shadow"
                                        >
                                            수정
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow"
                                        >
                                            삭제
                                        </button>
                                    </td>

                                </tr>
                            ))}
                            </tbody>
                        </table>

                        {/* 입력 폼 */}
                        <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-4 gap-2 items-center">
                            <input name="item" value={form.item} onChange={handleChange} placeholder="품목" required className="border p-2 rounded" />
                            <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="단가" required className="border p-2 rounded" />
                            <input name="amount" type="number" value={form.amount} onChange={handleChange} placeholder="수량" required className="border p-2 rounded" />
                            <button type="submit" className={`text-white px-4 py-2 rounded ${editingId ? 'bg-yellow-500' : 'bg-green-500'}`}>
                                {editingId ? '수정' : '등록'}
                            </button>
                        </form>
                    </div>

                    {/* 총합 */}
                    <div className="space-y-4">
                        <div className="bg-white p-4 shadow rounded text-center">
                            <div className="text-lg font-semibold">총 매출</div>
                            <div className="text-xl font-bold text-green-600">
                                {salesData.reduce((acc, cur) => acc + cur.total, 0).toLocaleString()}원
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default SalesPage;
