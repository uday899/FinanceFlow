import React, { useState } from 'react';
import api from '../api';

const AddTransaction = () => {
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('debit');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/transactions', {
        amount: parseFloat(amount),
        type,
        description,
        date
      });
      setAmount('');
      setDescription('');
      window.location.reload(); 
    } catch (err) {
      console.error(err);
      alert('Failed to add transaction.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-7 rounded-3xl shadow-sm border border-slate-100 transition-all">
      <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500"><path d="M12 5v14M5 12h14"/></svg>
        New Transaction
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">Type</label>
          <div className="flex bg-slate-100/80 p-1 rounded-xl border border-slate-200/50">
            <button type="button" onClick={() => setType('debit')} className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${type === 'debit' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}>Expense</button>
            <button type="button" onClick={() => setType('credit')} className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${type === 'credit' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}>Income</button>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">Amount</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">₹</span>
            <input type="number" step="0.01" required value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-400 text-slate-900" placeholder="0.00" />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">Date</label>
          <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-slate-900" />
        </div>
        
        <div className="mb-2">
          <label className="block text-sm font-medium text-slate-600 mb-2">Description</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-400 text-slate-900" placeholder="Groceries, Salary, etc." />
        </div>
        
        <button type="submit" disabled={loading} className="w-full bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-70 disabled:hover:scale-100">
          {loading ? 'Adding...' : (type === 'credit' ? 'Add Income' : 'Add Expense')}
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;
