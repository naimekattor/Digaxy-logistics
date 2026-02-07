import React, { useState, useEffect, useRef } from 'react';
import { Card } from './ui/Primitives'; // Button not used here
import { ChevronRight, MapPin, ShieldCheck, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Femi',
    location: 'Calorado, CA',
    text: 'The table we had moving super heavy and right from the beginning they handled it like professionals. salmon...',
    rating: 5,
  },
  {
    name: 'Victoria',
    location: 'Philadelphia, PA',
    text: 'Joel and Tipam were awesome! Friendly and communicative, fastest, careful and efficient. Exactly the type of guys you...',
    rating: 5,
  },
  {
    name: 'Nitengi',
    location: 'Philadelphia, PA',
    text: 'Joel and Tipam were awesome! Friendly and communicative, fastest, careful and efficient. Exactly the type of guys you...',
    rating: 5,
  },
  {
    name: 'Vulmer',
    location: 'Philadelphia, PA',
    text: 'Joel and Tipam were awesome! Friendly and communicative, fastest, careful and efficient. Exactly the type of guys you...',
    rating: 5,
  },
  {
    name: 'Metungi',
    location: 'Philadelphia, PA',
    text: 'Joel and Tipam were awesome! Friendly and communicative, fastest, careful and efficient. Exactly the type of guys you...',
    rating: 5,
  },
  // Add more testimonials here — they will be grouped in pairs automatically
  // {
  //   name: 'Marcus',
  //   location: 'Austin, TX',
  //   text: 'Super smooth experience — on time, careful with furniture, great communication throughout.',
  //   rating: 5,
  // },
  // ...
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Group testimonials into pairs (2 per slide)
  const groupedTestimonials = [];
  for (let i = 0; i < testimonials.length; i += 2) {
    groupedTestimonials.push(testimonials.slice(i, i + 2));
  }
  const totalGroups = groupedTestimonials.length;

  useEffect(() => {
    if (isPaused || totalGroups <= 1) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalGroups);
    }, 6000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, totalGroups]);

  return (
    <section className="py-24 px-4 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-brand-gold">
          Trusted thousands of Digaxy customers
        </h2>
        <p className="text-center text-gray-500 mb-16">
          What people say about their experience
        </p>

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation buttons – kept exactly as before */}
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + totalGroups) % totalGroups)}
            className="absolute left-0 top-1/2 -translate-x-12 hidden lg:flex w-12 h-12 rounded-full border border-gray-100 items-center justify-center bg-white text-gray-400"
          >
            <ChevronRight className="rotate-180" />
          </button>

          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % totalGroups)}
            className="absolute right-0 top-1/2 translate-x-12 hidden lg:flex w-12 h-12 rounded-full border border-gray-100 items-center justify-center bg-white text-gray-400"
          >
            <ChevronRight />
          </button>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {groupedTestimonials.map((pair, groupIndex) => (
                <div key={groupIndex} className="min-w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-8">
                    {pair.map((review, i) => (
                      <Card key={i} className="p-8 border border-brand-gold/20 bg-white">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden border-2 border-brand-gold">
                            <div className="w-full h-full bg-brand-gold/10 flex items-center justify-center font-bold text-brand-gold">
                              {review.name[0]}
                            </div>
                          </div>
                          <div>
                            <div className="flex text-yellow-500 mb-1">
                              {[...Array(5)].map((_, starIdx) => (
                                <Star key={starIdx} size={14} fill="currentColor" />
                              ))}
                            </div>
                            <div className="flex items-center gap-2">
                              <ShieldCheck size={14} className="text-blue-500" />
                              <span className="text-xs font-semibold text-gray-400">
                                Verified Service
                              </span>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-700 italic mb-6 leading-relaxed">
                          "{review.text}"
                        </p>

                        <div className="flex items-center gap-2">
                          <MapPin size={14} className="text-brand-gold" />
                          <span className="text-sm font-semibold text-gray-400">
                            {review.name} in {review.location}
                          </span>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots – kept minimal and matching style */}
          {totalGroups > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {groupedTestimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === currentIndex ? 'bg-brand-gold scale-125' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;