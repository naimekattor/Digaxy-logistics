'use client';

import React from 'react';
import { Card, Button } from '@/components/ui/Primitives';
import { Wallet, TrendingUp, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

const transactions = [
    { id: 'TX-1', type: 'Payout', amount: '-$320.00', date: 'Oct 28', status: 'Completed' },
    { id: 'TX-2', type: 'Assistance Earning', amount: '+$85.00', date: 'Oct 29', status: 'Pending' },
    { id: 'TX-3', type: 'Bonus', amount: '+$25.00', date: 'Oct 30', status: 'Completed' },
];

export default function HelperEarningsPage() {
  return (
    <div className="max-w-5xl">
        <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Helper Earnings</h1>
            <p className="text-gray-500">Track your assistance income and manage payouts</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="p-8 bg-brand-gold text-white shadow-xl shadow-brand-gold/20">
                <div className="flex items-center justify-between mb-8">
                    <p className="text-sm font-semibold uppercase tracking-widest opacity-80">Available Balance</p>
                    <Wallet size={24} className="opacity-80" />
                </div>
                <h3 className="text-5xl font-bold mb-8">$840.25</h3>
                <Button className="bg-white text-brand-gold hover:bg-white/90 font-bold h-14 rounded-2xl">
                    Withdraw Now
                </Button>
            </Card>

            <Card className="p-8 border-none shadow-sm flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-3 text-green-500 mb-4 font-bold">
                        <TrendingUp size={20} />
                        <span className="text-sm">+18% from last week</span>
                    </div>
                    <p className="text-gray-400 text-sm font-medium uppercase tracking-widest mb-2">Total Earned</p>
                    <h3 className="text-4xl font-bold">$6,150</h3>
                </div>
            </Card>

            <Card className="p-8 border-none shadow-sm flex flex-col justify-between">
                <div>
                    <p className="text-gray-400 text-sm font-medium uppercase tracking-widest mb-2">Active Jobs</p>
                    <h3 className="text-4xl font-bold text-brand-gold">2</h3>
                    <p className="text-xs text-gray-400 mt-2 font-medium">Expected today: $90</p>
                </div>
            </Card>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-8">Recent Transactions</h3>
        <div className="space-y-4">
            {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-6 bg-white rounded-2xl border border-gray-50 hover:shadow-sm transition-all">
                    <div className="flex items-center gap-6">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            tx.amount.startsWith('-') ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'
                        }`}>
                            {tx.amount.startsWith('-') ? <ArrowUpRight size={24} /> : <ArrowDownLeft size={24} />}
                        </div>
                        <div>
                            <p className="font-bold text-gray-900">{tx.type}</p>
                            <p className="text-xs text-gray-400 font-medium">{tx.id} • {tx.date}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className={`text-xl font-bold ${tx.amount.startsWith('-') ? 'text-gray-900' : 'text-green-600'}`}>
                            {tx.amount}
                        </p>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">{tx.status}</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
}
