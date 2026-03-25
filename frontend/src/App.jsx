import React from 'react';
import AddTransaction from './components/AddTransaction';
import TransactionList from './components/TransactionList';
import WeeklyReport from './components/WeeklyReport';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12 selection:bg-indigo-100">
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-10 transition-all">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-bold text-lg shadow-sm shadow-indigo-600/20">F</div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">FinanceFlow</h1>
          </div>
          <div className="text-sm font-medium text-slate-500 px-3 py-1 bg-slate-100 rounded-full">Dashboard</div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-10 flex flex-col gap-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 flex flex-col gap-8">
            <AddTransaction />
          </div>
          <div className="lg:col-span-8 flex flex-col gap-8">
            <WeeklyReport />
            <TransactionList />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
