import React from 'react';
import { Calendar, TrendingUp, Star } from 'lucide-react';
import { Card } from '@/components/ui/Primitives';

export default function EarningsWidget() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card className="p-4 flex flex-col items-center justify-center bg-gray-200 border-none">
        <div className="flex flex-col items-center gap-1">
            <Calendar className="text-gray-500 mb-1" size={20} />
            <span className="text-xs text-gray-500 font-medium uppercase">Today</span>
            <span className="text-lg font-bold text-brand-gold">$212.44</span>
        </div>
      </Card>
      
      <Card className="p-4 flex flex-col items-center justify-center bg-gray-200 border-none">
        <div className="flex flex-col items-center gap-1">
            <Calendar className="text-gray-500 mb-1" size={20} />
            <span className="text-xs text-gray-500 font-medium uppercase">This Week</span>
            <span className="text-lg font-bold text-brand-gold">$812.33</span>
        </div>
      </Card>

      <Card className="p-4 flex flex-col items-center justify-center bg-gray-200 border-none">
        <div className="flex flex-col items-center gap-1">
            <Calendar className="text-gray-500 mb-1" size={20} />
            <span className="text-xs text-gray-500 font-medium uppercase">Rating</span>
            <div className="flex items-center gap-1 text-brand-gold">
                <Star size={16} fill="#B8860B" />
                <span className="text-lg font-bold">4.97</span>
            </div>
        </div>
      </Card>
    </div>
  );
}