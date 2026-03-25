import React, { useState, useEffect } from 'react';
import api from '../api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const WeeklyReport = () => {
  const [report, setReport] = useState(null);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const { data } = await api.get('/report/weekly');
      setReport(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!report) return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 min-h-[400px]">
      Loading insights...
    </div>
  );

  const chartData = [
    { name: 'Income', amount: report.total_credit, fill: '#10B981', radius: [6, 6, 0, 0] },
    { name: 'Expense', amount: report.total_debit, fill: '#6366F1', radius: [6, 6, 0, 0] }
  ];

  const formatCurrency = (val) => `₹${val.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;

  return (
    <div className="bg-white p-6 sm:p-7 rounded-3xl shadow-sm border border-slate-100 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-slate-800">Weekly Summary</h2>
        <span className="text-xs font-medium text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
          {report.start_of_week} — {report.end_of_week}
        </span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-100/50 hover:border-slate-200 transition-colors">
          <p className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wide">Total Income</p>
          <p className="text-2xl font-bold text-emerald-600">{formatCurrency(report.total_credit)}</p>
        </div>
        <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-100/50 hover:border-slate-200 transition-colors">
          <p className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wide">Total Expenses</p>
          <p className="text-2xl font-bold text-slate-800">{formatCurrency(report.total_debit)}</p>
        </div>
        <div className={`p-5 rounded-2xl border transition-colors ${report.net_balance >= 0 ? 'bg-indigo-50/50 border-indigo-100/50 hover:border-indigo-200' : 'bg-rose-50/50 border-rose-100/50 hover:border-rose-200'}`}>
          <p className={`text-xs font-medium mb-2 uppercase tracking-wide ${report.net_balance >= 0 ? 'text-indigo-600' : 'text-rose-600'}`}>Net Balance</p>
          <p className={`text-2xl font-bold ${report.net_balance >= 0 ? 'text-indigo-700' : 'text-rose-700'}`}>
            {formatCurrency(report.net_balance)}
          </p>
        </div>
      </div>

      <div className="flex-1 w-full h-[220px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 13, fontWeight: 500}} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} tickFormatter={(val) => `₹${val.toLocaleString('en-IN')}`} />
            <Tooltip 
              cursor={{fill: '#f8fafc'}}
              contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', padding: '12px' }}
              itemStyle={{ fontWeight: 600, color: '#0f172a' }}
              formatter={(value) => [formatCurrency(value), 'Amount']}
            />
            <Bar dataKey="amount" maxBarSize={60} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyReport;
