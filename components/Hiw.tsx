import React from 'react'
import { Card } from './ui/Primitives'
import { Clock, Layout, MapPin, Package, ShieldCheck, Truck } from 'lucide-react'

const Hiw = () => {
  return (
    <section className="py-24 px-4 bg-[#ffffff]">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl md:text-5xl md:font-bold font-medium text-center mb-16 text-gray-900 ">How It Works</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    { title: 'Moving', desc: 'Select your pickup & drop-off, then choose your truck', icon: MapPin },
                    { title: 'Furniture Delivery', desc: 'Get furniture picked up and delivered quickly and safely', icon: Truck },
                    { title: 'Track & Deliver', desc: 'Track your driver live and stay updated in real-time.', icon: Clock },
                    { title: 'Retailer Deliveries', desc: 'Deliver your store purchases straight to your doorstep.', icon: Package },
                    { title: 'Donation Pickup', desc: 'Schedule a pickup and send items to your donation center.', icon: ShieldCheck },
                    { title: 'Commercial Moving', desc: 'Professional labor for business moves of any size.', icon: Layout },
                  ].map((service, i) => (
                    <Card key={i} className="p-10 text-center group hover:shadow-xl transition-all  bg-white border-[#A97200] border-[0.6px]">
                      <div className="w-16 h-16 bg-brand-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:bg-brand-gold group-hover:text-white transition-colors">
                        <service.icon size={32} className="text-brand-gold group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="text-[24px] md:text-[28px] md:font-bold font-medium mb-4">{service.title}</h3>
                      <p className="text-gray-500 text-[17px] leading-relaxed">{service.desc}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
    
  )
}

export default Hiw
