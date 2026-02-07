'use client';

import React from 'react';
import { Card, Badge } from '@/components/ui/Primitives';
import { History, MapPin, Star } from 'lucide-react';

const history = [
    { id: 'JOB-22', customer: 'John Smith', service: 'Box Truck Move', rating: 5, date: 'Jan 15, 2026', from: 'Brooklyn, NY', to: 'Manhattan, NY', earning: '$250.00' },
    { id: 'JOB-21', customer: 'Sarah Miller', service: 'Van Delivery', rating: 4, date: 'Jan 12, 2026', from: 'Queens, NY', to: 'Bronx, NY', earning: '$120.00' },
    { id: 'JOB-20', customer: 'Michael Ross', service: 'Furniture Assembly', rating: 5, date: 'Jan 10, 2026', from: 'Jersey City, NJ', to: 'Jersey City, NJ', earning: '$85.00' },
];

export default function DriverHistoryPage() {
  return (
    <div className="max-w-5xl">
        <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Job History</h1>
            <p className="text-gray-500">Review your past successfully completed tasks</p>
        </div>

        <div className="space-y-6">
            {history.map((job) => (
                <Card key={job.id} className="p-8 border-none shadow-sm hover:shadow-md transition-all">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-4">
                                <Badge variant="success">Completed</Badge>
                                <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">{job.id} • {job.date}</span>
                            </div>
                            <h3 className="text-2xl font-extrabold text-gray-900 mb-2">{job.service}</h3>
                            <div className="flex items-center gap-2 mb-6">
                                <div className="flex text-yellow-500">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < job.rating ? 'currentColor' : 'none'} className={i < job.rating ? "" : "text-gray-200"} />)}
                                </div>
                                <span className="text-sm font-semibold text-gray-500">Rating from {job.customer}</span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 text-sm text-gray-400">
                                    <MapPin size={16} className="text-brand-gold" />
                                    <span>{job.from}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-400">
                                    <MapPin size={16} className="text-brand-gold" />
                                    <span>{job.to}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-12">
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Earning</p>
                            <p className="text-4xl font-black text-brand-gold italic">{job.earning}</p>
                            <button className="text-sm font-bold text-gray-500 hover:text-brand-gold transition-colors">Details</button>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    </div>
  );
}
