import MainLayout from '@/components/MainLayout';
import React from 'react';

const PolicySection = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="text-xl font-bold text-[#0f2a3f] mb-4">{title}</h2>
    <div className="text-slate-600 text-sm leading-relaxed space-y-4">
      {children}
    </div>
  </div>
);

export default function PrivacyPage() {
  return (
    <MainLayout>
    <div className="min-h-screen bg-white font-sans text-slate-900 pb-20">
      {/* Header Section */}
      <header className="pt-20 pb-12 px-4 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl font-black text-[#0f2a3f] mb-8">Privacy Policy</h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          This Privacy Policy describes how Digaxy ("we", "our", or "us") collects, uses, maintains, and protects information obtained from users ("Users") of the Digaxy website and services ("Site"). This policy applies to all visitors, customers, drivers, movers, and anyone interacting with our platform.
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 md:px-12">
        
        <PolicySection title="Personal Identification Information">
          <p>
            We may collect personal identification information from Users in a variety of ways, including when they visit our Site, create an account, place an order, fill out a form, or use any features or services available on Digaxy.
          </p>
          <p>
            Users may be asked to provide information such as their name, email address, phone number, billing address, or delivery address. Users may choose to visit the Site anonymously, and we will only collect personal information if they voluntarily submit it.
          </p>
        </PolicySection>

        <PolicySection title="Non-Personal Identification Information">
          <p>
            We may collect non-personal identification information when Users interact with our Site. This information may include browser name, device type, operating system, internet service provider, and other similar technical details.
          </p>
          <p>
            This information helps us improve our services, understand how Users browse our Site, and diagnose technical issues.
          </p>
        </PolicySection>

        <PolicySection title="How We Protect Your Information">
          <p>
            We use appropriate data collection, storage, and processing practices to protect your personal information from unauthorized access, alteration, or disclosure.
          </p>
          <p>
            However, no method of transmission over the internet is completely secure, and Users acknowledge that they share information at their own risk.
          </p>
        </PolicySection>

        <PolicySection title="Sharing Your Information">
          <p>
            We do not sell, trade, or rent Users' personal identification information. We may share general aggregated information not linked to personal details with our business partners or advertisers.
          </p>
          <p>
            Personal information may be shared with trusted third-party service providers who assist in operating our platform—such as payment processors, background check partners, and cloud hosting providers. These partners are required to protect your information.
          </p>
        </PolicySection>

        {/* Contact Section */}
        <section className="mt-16 pt-8 border-t border-slate-100">
          <h2 className="text-xl font-bold text-[#0f2a3f] mb-4">Contacting Us</h2>
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