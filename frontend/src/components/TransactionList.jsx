import React, { useState, useEffect } from 'react';
import api from '../api';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const { data } = await api.get('/transactions');
      setTransactions(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-7 rounded-3xl shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-slate-800">Recent Transactions</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded-md">{transactions.length} Total</span>
          {transactions.length > 0 && (
            <button 
              onClick={async () => {
                if(window.confirm('Are you sure you want to clear all transactions? This cannot be undone.')) {
                  try {
                    await api.delete('/transactions');
                    window.location.reload();
                  } catch (e) {
                    console.error('Failed to clear transactions');
                    alert('There was an error clearing the transactions.');
                  }
                }
              }}
              className="text-xs font-medium text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-2 py-1 rounded-md transition-colors cursor-pointer"
            >
              Clear All
            </button>
          )}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 text-xs uppercase tracking-wider">
              <th className="py-3 px-2 font-semibold">Date</th>
              <th className="py-3 px-2 font-semibold">Description</th>
              <th className="py-3 px-2 font-semibold">Type</th>
              <th className="py-3 px-2 font-semibold text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {transactions.map(t => (
              <tr key={t.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors group">
                <td className="py-4 px-2 text-slate-500 whitespace-nowrap">{t.date}</td>
                <td className="py-4 px-2 font-medium text-slate-800">{t.description || '-'}</td>
                <td className="py-4 px-2">
                  <span className={`inline-flex items-center px-2 py-1 text-[11px] font-bold uppercase tracking-wider rounded-md ${t.type === 'credit' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                    {t.type}
                  </span>
                </td>
                <td className={`py-4 px-2 text-right font-semibold whitespace-nowrap ${t.type === 'credit' ? 'text-emerald-600' : 'text-slate-900'}`}>
                  {t.type === 'credit' ? '+' : '-'}₹{t.amount.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                </td>
              </tr>
            ))}
            {transactions.length === 0 && (
              <tr>
                <td colSpan="4" className="py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><path d="m9 16 3-3 3 3"/></svg>
                    <p>No transactions recorded yet.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionList;
