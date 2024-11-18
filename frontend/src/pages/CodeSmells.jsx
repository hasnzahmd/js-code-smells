import React, { useState } from 'react';
import axios from 'axios';
import { codeSmellTypes } from '../utils/constants';

const CodeSmells = () => {
    const [directory, setDirectory] = useState('');
    const [codeSmells, setCodeSmells] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const detectCodeSmells = async () => {
        setError('');
        setLoading(true);
        setCodeSmells(null);
        try {
            const response = await axios.post('http://localhost:5050/detect-code-smells', { path: directory.trim() });
            if (response.status === 200) {
                setCodeSmells(response.data);
                console.log(JSON.stringify(response.data, null, 2));
            }
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred');
        }
        setLoading(false);
    };

    const renderTable = (data, columns) => (
        <div className="overflow-auto h-64 border rounded relative">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0">
                    <tr>
                        <th className="px-6 py-3 text-sm text-left font-medium text-gray-600 tracking-wider">#</th>
                        {columns.map((col) => (
                            <th
                                key={col}
                                className={`px-6 py-3 text-sm ${col === 'File' ? 'text-left' : 'text-center'} font-medium text-gray-600 tracking-wider`}
                            >
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.length === 0 ? 
                        <tr className='absolute top-[58%] left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                            <td colSpan={columns.length + 1}>
                                None detected
                            </td>
                        </tr> 
                        :
                        data.map((row, idx) => (
                            <tr key={idx}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b text-left">{idx + 1}</td>
                                {columns.map((col) => (
                                    <td key={col} className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b ${col === 'File' ? 'text-left' : 'text-center'}`}>
                                        {row[col.charAt(0).toLowerCase() + col.split(' ').join('').slice(1)]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto my-10">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-900">Detect JavaScript Code Smells</h1>
            <h2 className="text-xl mb-6 text-center text-blue-900">Enter directory path of a file or folder</h2>
            <div className="mb-4 flex flex-col justify-center">
                <input
                    type="text"
                    value={directory}
                    onChange={(e) => setDirectory(e.target.value)}
                    placeholder="Enter directory path"
                    className="border border-gray-300 p-2 rounded-lg"
                />
                <button
                    onClick={directory ? detectCodeSmells : undefined}
                    className={`mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded self-center ${!directory && 'cursor-not-allowed opacity-70'}`}
                >
                    Detect
                </button>
            </div>

            {loading && <p className='text-center mt-10'>Loading...</p>}
            {error && <p className='text-center text-red-500 mt-10'>{error}</p>}

            {codeSmells && (
                <div className='flex flex-col'>
                    {codeSmellTypes.map(({ type, dataKey, columns }) => (
                        <div key={type} className="mt-8">
                            <h2 className="text-xl font-semibold text-blue-900 mb-2">{type}</h2>
                            {renderTable(codeSmells[dataKey], columns)}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CodeSmells;
