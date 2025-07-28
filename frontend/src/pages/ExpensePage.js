import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../api';

function ExpensePage() {
    const [expenses, setExpenses] = useState([]);

    const [selectedDate, setSelectedDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split("T")[0];
    });

    const [form, setForm] = useState({ category: '', amount: '', memo: '' });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        if (selectedDate) {
            fetchExpensesByDate(selectedDate);
        }
    }, [selectedDate]);

    const fetchExpensesByDate = (date) => {
        api.get(`/expense/date/${date}`)
            .then((res) => setExpenses(res.data))
            .catch((err) => console.error('지출 데이터 호출 실패:', err));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedDate) {
            alert('먼저 날짜를 선택하세요!');
            return;
        }

        const newExpense = {
            category: form.category,
            amount: parseInt(form.amount),
            memo: form.memo,
            date: selectedDate
        };

        const request = editingId
            ? api.put(`/expense/${editingId}`, newExpense)
            : api.post('/expense', newExpense);

        request
            .then(() => {
                setForm({ category: '', amount: '', memo: '' });
                setEditingId(null);
                fetchExpensesByDate(selectedDate);
            })
            .catch((err) => console.error('지출 등록 실패:', err));
    };

    const handleEdit = (expense) => {
        setForm({ category: expense.category, amount: expense.amount, memo: expense.memo });
        setEditingId(expense.id);
    };

    const handleDelete = (id) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            api.delete(`/expense/${id}`)
                .then(() => fetchExpensesByDate(selectedDate))
                .catch((err) => console.error('삭제 실패:', err));
        }
    };

    const total = expenses.reduce((acc, item) => acc + item.amount, 0);

    return (
        <Layout>
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-center">지출 현황판</h2>

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
                    {/* 좌측 테이블 */}
                    <div className="col-span-2">
                        <table className="w-full border text-center">
                            <thead className="bg-gray-700 text-white">
                            <tr>
                                <th className="border px-2 py-2">분류</th>
                                <th className="border px-2 py-2">금액</th>
                                <th className="border px-2 py-2">메모</th>
                                <th className="border px-2 py-2">수정</th>
                                <th className="border px-2 py-2">삭제</th>
                            </tr>
                            </thead>
                            <tbody>
                            {expenses.map((item) => (
                                <tr key={item.id}>
                                    <td className="border px-2 py-2">{item.category}</td>
                                    <td className="border px-2 py-2">{item.amount.toLocaleString()} 원</td>
                                    <td className="border px-2 py-2">{item.memo}</td>
                                    <td className="border px-2 py-2">
                                        <button onClick={() => handleEdit(item)} className="text-blue-500 font-semibold">수정</button>
                                    </td>
                                    <td className="border px-2 py-2">
                                        <button onClick={() => handleDelete(item.id)} className="text-red-500 font-semibold">삭제</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                        {/* 등록 폼 */}
                        <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-4 gap-2 items-center">
                            <input
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                placeholder="분류"
                                required
                                className="border p-2 rounded"
                            />
                            <input
                                name="amount"
                                type="number"
                                value={form.amount}
                                onChange={handleChange}
                                placeholder="금액"
                                required
                                className="border p-2 rounded"
                            />
                            <input
                                name="memo"
                                value={form.memo}
                                onChange={handleChange}
                                placeholder="메모"
                                className="border p-2 rounded"
                            />
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                                {editingId ? '수정완료' : '등록'}
                            </button>
                        </form>
                    </div>

                    {/* 우측 요약 */}
                    <div className="space-y-4">
                        <div className="bg-white shadow-md rounded overflow-hidden text-center">
                            <div className="bg-gray-700 text-white py-2 font-semibold">총 지출</div>
                            <div className="bg-gray-100 py-2 text-lg font-bold text-red-600">
                                {total.toLocaleString()} 원
                            </div>
                        </div>

                        <div className="bg-gray-200 p-2">
                            <div className="bg-gray-600 text-white py-1 text-center">비고</div>
                            <div className="bg-white h-24"></div>
                        </div>

                        <div className="bg-green-400 h-48 rounded shadow-md flex items-center justify-center text-white text-xl font-semibold">
                            Calendar 자리
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ExpensePage;
