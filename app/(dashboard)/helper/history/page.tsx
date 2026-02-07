'use client';

import React from 'react';
import { Card, Badge } from '@/components/ui/Primitives';
import { History, MapPin, Star, User } from 'lucide-react';

const history = [
    { id: 'JOB-H1', driver: 'Naim Doe', service: 'Furniture Assistance', rating: 5, date: 'Jan 15, 2026', location: 'Brooklyn, NY', earning: '$60.00' },
    { id: 'JOB-H2', driver: 'Mike Driver', service: 'Apartment Load-out', rating: 5, date: 'Jan 12, 2026', location: 'Queens, NY', earning: '$45.00' },
];

export default function HelperHistoryPage() {
  return (
    <div className="max-w-5xl">
        <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Assistance History</h1>
            <p className="text-gray-500">Your past help records and earned tips</p>
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
                                <User size={14} className="text-brand-gold" />
                                <span className="text-sm font-semibold text-gray-500">Worked with {job.driver}</span>
                            </div>
                            
                            <div className="flex items-center gap-3 text-sm text-gray-400">
                                <MapPin size={16} className="text-brand-gold" />
                                <span>{job.location}</span>
                            </div>
                        </div>

                        <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-12">
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Earning</p>
                            <p className="text-4xl font-black text-brand-gold italic">{job.earning}</p>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    </div>
  );
}
