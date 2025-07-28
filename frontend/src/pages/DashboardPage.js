import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../api';

function DashboardPage() {
    const [summary, setSummary] = useState(null);
    const [selectedDate, setSelectedDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split("T")[0]; // "YYYY-MM-DD"
    });

    useEffect(() => {
        if (selectedDate) {
            api.get(`/summary?date=${selectedDate}`)
                .then((res) => {
                    console.log('✅ summary 응답 확인:', res.data);
                    setSummary(res.data);
                })
                .catch((err) => console.error('통합 요약 데이터 호출 실패:', err));
        }
    }, [selectedDate]);

    if (!summary || !summary.daily || !summary.monthly) {
        return <div className="text-center mt-10">로딩 중...</div>;
    }

    const { daily, monthly } = summary;

    // ✅ 한글로 key 변환
    const labelMap = {
        sales: "매출",
        expense: "지출",
        marginRate: "마진률",
        netProfit: "순이익"
    };

    return (
        <Layout>
            <div className="p-6 space-y-6">
                {/* 날짜 선택 */}
                <div className="text-center">
                    <label className="mr-2 font-semibold">날짜 a:</label>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="border px-2 py-1 rounded"
                    />
                </div>

                {/* 카드 4개 */}
                <div className="grid grid-cols-4 gap-4">
                    <div className="bg-green-500 text-white p-4 rounded shadow">
                        매출<br /><span className="text-2xl font-bold">{daily.sales.toLocaleString()}원</span>
                    </div>
                    <div className="bg-sky-600 text-white p-4 rounded shadow">
                        지출<br /><span className="text-2xl font-bold">{daily.expense.toLocaleString()}원</span>
                    </div>
                    <div className="bg-yellow-400 text-white p-4 rounded shadow">
                        마진률<br /><span className="text-2xl font-bold">{daily.marginRate}</span>
                    </div>
                    <div className="bg-rose-500 text-white p-4 rounded shadow">
                        순이익<br /><span className="text-2xl font-bold">{daily.netProfit.toLocaleString()}원</span>
                    </div>
                </div>

                {/* ✅ 선택한 날짜 기준 텍스트 */}
                <h2 className="text-center bg-cyan-100 py-2 font-bold text-xl">
                    {selectedDate}
                </h2>

                {/* 일별 상세 */}
                <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white shadow rounded overflow-hidden">
                        {Object.entries(daily).map(([key, value], idx) => (
                            <div key={idx} className="grid grid-cols-2 text-center">
                                <div className="bg-gray-700 text-white py-2">
                                    {labelMap[key] || key}
                                </div>
                                <div className="bg-gray-100 py-2">
                                    {value?.toLocaleString?.() || value}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="bg-green-400 h-48 rounded shadow flex items-center justify-center text-white text-xl font-semibold">
                        Calendar 자리
                    </div>
                </div>

                {/* 월간 합계 */}
                <h2 className="text-center bg-cyan-100 py-2 font-bold text-xl">
                    {new Date(selectedDate).getMonth() + 1}월 통계
                </h2>
                <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white shadow rounded overflow-hidden">
                        {Object.entries(monthly).map(([key, value], idx) => (
                            <div key={idx} className="grid grid-cols-2 text-center">
                                <div className="bg-gray-700 text-white py-2">
                                    {labelMap[key] || key}
                                </div>
                                <div className="bg-gray-100 py-2">
                                    {value?.toLocaleString?.() || value}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="bg-sky-400 h-48 rounded shadow flex items-center justify-center text-white text-xl font-semibold">
                        Sales Graph 자리
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default DashboardPage;
