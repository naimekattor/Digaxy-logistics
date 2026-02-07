import React, { useState } from 'react'
import { AccordionItem, Button } from './ui/Primitives'

const Faq = () => {
      const [openFaq, setOpenFaq] = useState<number | null>(0);
    
  return (
    <section className="py-24 px-4 bg-gray-50/30">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 ">Frequently Asked Questions</h2>
            <p className="text-center text-gray-500 mb-16">Everything you need to know about Digaxy.</p>
            
            <div className="space-y-4">
              {[
                { q: 'What hours does Digaxy operate?', a: 'Digaxy operated 7 days a week from 7AM-10PM. Availability may vary by city.' },
                { q: 'How much does Digaxy cost?', a: 'Digaxy pricing varies by service. Please check our pricing page for details.' },
                { q: 'Can I book a same-day move?', a: 'Yes! We offer flexible same-day bookings depending on availability.' },
                { q: 'How do I tip and/or rate my crew?', a: 'After your move, you\'ll receive a link to tip and rate your crew easily.' }
              ].map((faq, i) => (
                <AccordionItem 
                  key={i} 
                  title={faq.q} 
                  isOpen={openFaq === i} 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {faq.a}
                </AccordionItem>
              ))}
            </div>
            
            <div className="mt-12 text-center">
                <Button variant="outline" className="w-auto px-10 border-2 rounded-full font-bold bg-brand-gold text-white hover:bg-brand-gold/90">Visit Help Center</Button>
            </div>
          </div>
        </section>
  )
}

export default Faq
