// app/pending/page.tsx
import Link from 'next/link';
import { CheckCircle2, Clock, Mail, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Application Pending - Approval in Progress',
  description: 'Your driver application is under review. We will notify you by email once approved.',
};

export default function PendingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        {/* Top accent bar */}
        <div className="h-2 bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500" />

        <div className="p-8 md:p-10">
          {/* Icon */}
          <div className="mx-auto w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center mb-6">
            <Clock className="w-10 h-10 text-amber-600" strokeWidth={2} />
          </div>

          {/* Main heading */}
          <h1 className="text-3xl font-bold text-slate-800 text-center mb-3">
            Application Pending
          </h1>

          {/* Subtitle */}
          <p className="text-slate-600 text-center text-lg mb-8">
            Your driver application is currently under review
          </p>

          {/* Status card */}
          <div className="bg-slate-50 rounded-xl p-6 mb-8 border border-slate-100">
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-medium text-slate-800 mb-1">
                  What happens next?
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Our team is reviewing your documents and background information. 
                  This usually takes 2–7 business days.
                </p>
              </div>
            </div>
          </div>

          {/* Email notification box */}
          <div className="flex flex-col items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center">
              <Mail className="w-7 h-7 text-brand-gold" />
            </div>
            <div className="text-center">
              <p className="text-slate-700 font-medium mb-1">
                You will get an email when approved
              </p>
              <p className="text-sm text-slate-500">
                Please check your inbox (and spam/junk folder)
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 w-full bg-brand-gold  text-white font-medium py-3.5 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg group"
            >
              Return to Home
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* <Link
              href="/support"
              className="flex items-center justify-center w-full border border-slate-300 hover:border-slate-400 text-slate-700 font-medium py-3.5 px-6 rounded-xl transition-colors duration-200"
            >
              Contact Support
            </Link> */}
          </div>

          {/* Footer note */}
          <p className="text-center text-sm text-slate-500 mt-10">
            Thank you for choosing to drive with us!
          </p>
        </div>
      </div>
    </div>
  );
}