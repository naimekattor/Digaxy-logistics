import MainLayout from '@/components/MainLayout';
import React from 'react';

const TermsSection = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="text-xl font-black text-[#0f2a3f] mb-4">{title}</h2>
    <div className="text-slate-600 text-sm leading-relaxed space-y-4">
      {children}
    </div>
  </div>
);

const BulletList = ({ items }) => (
  <ul className="list-disc ml-5 mt-2 space-y-2">
    {items.map((item, index) => (
      <li key={index} className="pl-2">{item}</li>
    ))}
  </ul>
);

export default function TermsAndConditions() {
  return (
    <MainLayout>
    <div className="min-h-screen bg-white font-sans text-slate-900 pb-20">
      {/* Header Section */}
      <header className="pt-20 pb-12 px-4 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl font-black text-[#0f2a3f] mb-8">Terms & Condition</h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          These Terms & Conditions ("Terms") govern your use of Digaxy ("we", "our", or "us") 
          and all services offered through our website, mobile application, and platform ("Site"). 
          By accessing or using Digaxy, you agree to follow these Terms. If you do not agree, 
          please do not use our services.
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 md:px-12">
        
        <TermsSection title="Use of the Site">
          <p>
            Users may access Digaxy for personal or business use. You agree to use the Site in a 
            lawful manner and not engage in activities that may harm the platform, other users, 
            drivers, or customers. Misuse of the Site, including attempts to disrupt functionality, 
            create fraudulent bookings, or damage property, may result in account suspension.
          </p>
        </TermsSection>

        <TermsSection title="Account Registration">
          <p>
            To use certain features, Users may need to create an account. You agree to:
          </p>
          <BulletList items={[
            "Provide accurate and up-to-date information",
            "Maintain the security of your account credentials",
            "Notify us immediately of unauthorized access"
          ]} />
          <p className="mt-4">
            Digaxy is not responsible for losses caused by Users' failure to protect account information.
          </p>
        </TermsSection>

        <TermsSection title="Service Description">
          <p>
            Digaxy provides on-demand delivery and moving services by connecting customers with 
            independent drivers and movers. We may update, modify, or discontinue features of 
            the platform at any time without prior notice.
          </p>
        </TermsSection>

        <TermsSection title="Booking & Delivery Responsibilities">
          <p>By booking a service through Digaxy, you agree to:</p>
          <BulletList items={[
            "Provide accurate pickup and drop-off addresses",
            "Ensure items are safe for transport",
            "Comply with local laws regarding restricted items",
            "Be available for communication during the delivery"
          ]} />
        </TermsSection>

        {/* Contact Section */}
        <section className="mt-16 pt-8 border-t border-slate-100">
          <h2 className="text-xl font-black text-[#0f2a3f] mb-4">Contacting Us</h2>
          <div className="text-sm font-medium space-y-2">
            <p className="text-slate-600">
              Email: <span className="text-[#a67c00]">support@digaxy.com</span>
            </p>
            <p className="text-slate-600">
              Website: <span className="text-[#a67c00]">www.digaxy.com</span>
            </p>
          </div>
        </section>
      </main>
    </div>
    </MainLayout>
  );
}