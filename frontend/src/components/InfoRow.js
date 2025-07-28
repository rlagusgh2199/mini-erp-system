import React from 'react';

function InfoRow({ label, value, dark = false }) {
    return (
        <div className="grid grid-cols-2 text-center">
            <div className={`${dark ? 'bg-gray-700 text-white' : 'bg-gray-100'} py-2 font-medium`}>
                {label}
            </div>
            <div className="bg-white py-2">{value}</div>
        </div>
    );
}

export default InfoRow;
