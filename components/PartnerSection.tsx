import { Clock, Info, ShieldCheck, Star } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const PartnerSection = () => {
  return (
    <section className="py-24 px-4 bg-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="relative w-full max-w-sm aspect-square">
  <Image
    src="/images/partner.png"
    alt="partner"
    fill
    className="object-contain"
  />
</div>


            <div className="order-1 md:order-2">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 ">Become a Digaxy Partner</h2>
                <p className="text-gray-500 mb-12">Join trusted delivery & moving jobs in your city.</p>
                
                <div className="space-y-8">
                    {[
                        { title: 'Fast Payouts', desc: 'Receive payments weekly.', icon: Info },
                        { title: 'Flexible Schedule', desc: 'Work whenever you want.', icon: Clock },
                        { title: 'Smart Job Matching', desc: 'We send you nearby jobs.', icon: ShieldCheck },
                        { title: 'High-Earning Tips', desc: 'Premium moving & delivery tasks.', icon: Star }
                    ].map((benefit, i) => (
                        <div key={i} className="flex gap-6 items-start">
                            <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                                <benefit.icon className="text-brand-gold" size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg text-gray-900">{benefit.title}</h4>
                                <p className="text-gray-500">{benefit.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        </section>
  )
}

export default PartnerSection
