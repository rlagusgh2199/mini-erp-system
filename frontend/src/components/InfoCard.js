import React from 'react';

function InfoCard({ title, value }) {
    return (
        <div className="bg-white shadow-md rounded p-4 text-center">
            <div className="text-xl font-bold bg-gray-800 text-white p-2 rounded-t">{title}</div>
            <div className="text-2xl font-bold p-4">{value}</div>
        </div>
    );
}

export default InfoCard;
