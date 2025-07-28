import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../api';

function InventoryPage() {
    const [inventory, setInventory] = useState([]);

    const [selectedDate, setSelectedDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split("T")[0];
    });

    const [form, setForm] = useState({ name: '', price: '', qty: '' });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        if (selectedDate) {
            fetchInventoryByDate(selectedDate);
        }
    }, [selectedDate]);

    const fetchInventoryByDate = (date) => {
        api.get(`/inventory/date/${date}`)
            .then((res) => setInventory(res.data))
            .catch((err) => console.error('재고 데이터 호출 실패:', err));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedDate) return alert('날짜를 먼저 선택하세요.');

        const newItem = {
            name: form.name,
            price: parseInt(form.price),
            qty: parseInt(form.qty),
            date: selectedDate
        };

        const request = editId
            ? api.put(`/inventory/${editId}`, newItem)
            : api.post('/inventory', newItem);

        request.then(() => {
            setForm({ name: '', price: '', qty: '' });
            setEditId(null);
            fetchInventoryByDate(selectedDate);
        }).catch((err) => console.error('저장 실패:', err));
    };

    const handleEdit = (item) => {
        setForm({ name: item.name, price: item.price, qty: item.qty });
        setEditId(item.id);
    };

    const handleDelete = (id) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            api.delete(`/inventory/${id}`)
                .then(() => fetchInventoryByDate(selectedDate))
                .catch((err) => console.error('삭제 실패:', err));
        }
    };

    const total = inventory.reduce((acc, item) => acc + item.price * item.qty, 0);

    return (
        <Layout>
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-center">재고 현황판</h2>

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
                    <div className="col-span-2">
                        <table className="w-full border text-center">
                            <thead className="bg-gray-700 text-white">
                            <tr>
                                <th className="border px-2 py-2">품목</th>
                                <th className="border px-2 py-2">단가</th>
                                <th className="border px-2 py-2">수량</th>
                                <th className="border px-2 py-2">합계</th>
                                <th className="border px-2 py-2">관리</th>
                            </tr>
                            </thead>
                            <tbody>
                            {inventory.map((item) => (
                                <tr key={item.id}>
                                    <td className="border px-2 py-2">{item.name}</td>
                                    <td className="border px-2 py-2">{item.price.toLocaleString()}</td>
                                    <td className="border px-2 py-2">{item.qty}</td>
                                    <td className="border px-2 py-2">{(item.price * item.qty).toLocaleString()}</td>
                                    <td className="border px-2 py-2 space-x-2">
                                        <button onClick={() => handleEdit(item)} className="bg-yellow-400 px-2 py-1 rounded">수정</button>
                                        <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white px-2 py-1 rounded">삭제</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                        <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-4 gap-2 items-center">
                            <input name="name" value={form.name} onChange={handleChange} placeholder="품목" required className="border p-2 rounded" />
                            <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="단가" required className="border p-2 rounded" />
                            <input name="qty" type="number" value={form.qty} onChange={handleChange} placeholder="수량" required className="border p-2 rounded" />
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{editId ? '수정' : '등록'}</button>
                        </form>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-white shadow-md rounded overflow-hidden text-center">
                            <div className="bg-gray-700 text-white py-2 font-semibold">총 재고 금액</div>
                            <div className="bg-gray-100 py-2 text-lg font-bold text-green-700">
                                {total.toLocaleString()} 원
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default InventoryPage;
