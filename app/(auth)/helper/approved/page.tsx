// app/helper/approved/page.tsx
import Link from "next/link";
import { CheckCircle2, Smartphone, ArrowRight, Download } from "lucide-react";

export const metadata = {
  title: "Helper Approved - Start Working",
  description:
    "Your helper account has been approved. Download the app to start receiving delivery requests.",
};

export default function HelperApprovedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        {/* Top accent bar */}
        <div className="h-2 bg-brand-gold" />

        <div className="p-8 md:p-10">
          {/* Success Icon */}
          <div className="mx-auto w-20 h-20 rounded-full bg-brand-gold/10 flex items-center justify-center mb-6">
            <CheckCircle2
              className="w-10 h-10 text-brand-gold"
              strokeWidth={2}
            />
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl font-bold text-slate-800 text-center mb-3">
            You’re Approved!
          </h1>

          {/* Subtitle */}
          <p className="text-slate-600 text-center text-lg mb-8">
            Your helper account has been successfully verified.
          </p>

          {/* Info Card */}
          <div className="bg-slate-50 rounded-xl p-6 mb-8 border border-slate-100">
            <div className="flex items-start gap-4">
              <Smartphone className="w-6 h-6 text-brand-gold mt-1" />
              <div>
                <h3 className="font-medium text-slate-800 mb-1">
                  Start receiving jobs
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  To receive delivery requests, go online in the mobile app.
                  You can view job details, navigate to pickup/drop-off locations, and track your earnings.
                </p>
              </div>
            </div>
          </div>

          {/* Download Section */}
          <div className="space-y-4 mb-8">
            <a
              href="#"
              className="flex items-center justify-center gap-2 w-full bg-brand-gold text-white font-medium py-3.5 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Download className="w-5 h-5" />
              Download on Google Play
            </a>

            <a
              href="#"
              className="flex items-center justify-center gap-2 w-full bg-brand-gold text-white font-medium py-3.5 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Download className="w-5 h-5" />
              Download on App Store
            </a>
          </div>

          {/* Secondary Action */}
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full border border-slate-300 hover:border-slate-400 text-slate-700 font-medium py-3.5 px-6 rounded-xl transition-colors duration-200 group"
          >
            Go to Home
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Footer */}
          <p className="text-center text-sm text-slate-500 mt-10">
            Welcome aboard — we’re excited to have you on the team 🚚
          </p>
        </div>
      </div>
    </div>
  );
}
