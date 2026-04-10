import React from 'react';
import Image from 'next/image';
import { ShieldCheck, Cross, FlaskConical, Target } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      {/* Overview Section */}
      <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
        <div>
          <span className="mb-4 inline-block px-4 py-1.5 rounded-full bg-green-50 text-green-700 border border-green-200 text-sm font-semibold tracking-wide">
            Established date: 1 January 2019
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            About <span className="text-green-600">Kashish Life Science®</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Kashish Life Science® is an Indian company built under the <strong>Make in India</strong> initiative. We provide a one-stop solution for the Indian veterinary industry, focusing on premium cattle feed supplements and veterinary therapeutic products.
          </p>
          <div className="prose prose-emerald text-gray-600 mb-8">
            <p className="mb-4">
              Our core philosophy is rooted in scientific formulations, quality assurance, and affordable pricing. We emphasize innovation in animal healthcare to dramatically improve animal health, performance, and productivity across modern dairy operations.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 mt-8">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-100 shadow-sm">
              <ShieldCheck className="text-green-500" size={20} />
              <span className="font-semibold text-gray-800">ISO Certified</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-100 shadow-sm">
              <ShieldCheck className="text-green-500" size={20} />
              <span className="font-semibold text-gray-800">MSME Registered</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-100 shadow-sm">
              <ShieldCheck className="text-green-500" size={20} />
              <span className="font-semibold text-gray-800">FSSAI Registered</span>
            </div>
          </div>
        </div>
        <div className="relative aspect-video lg:aspect-square rounded-3xl overflow-hidden shadow-xl bg-green-50 border border-green-100 p-8 flex flex-col items-center justify-center gap-6">
          <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white shadow-lg mb-2 bg-white">
             <Image src="/owner.jpeg" alt="Managing Director of Kashish Life Science" fill className="object-cover object-top" />
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Managing Director</h3>
            <p className="font-semibold text-gray-800 text-lg">Bhujveer Singh</p>
            <p className="text-sm text-green-700 font-medium mb-3">(MSC bio-chemestry, MBA Finance)</p>
            <p className="text-gray-500">Dedicated to transforming animal healthcare through quality & innovation.</p>
          </div>
        </div>
      </div>

      {/* Philosophy & Solutions */}
      <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-16 tracking-tight">Solving Key Animal Health Challenges</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-6">
            <FlaskConical size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Targeting Calcium Deficiency</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Critical before calving for fetus development and after calving for milk production. We prevent milk fever (hypocalcemia) via our premium calcium formulations.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-6">
            <Target size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Maximizing Productivity</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            By preventing mastitis and udder infections (like epithelial layer damage), our targeted mastitis solutions secure high milk yields and reduce leakage risks.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-6">
            <Cross size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Tackling Energy & Worms</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Combating postnatal hypoglycemia and major parasite infestations (Nematodes & Trematodes) which steal nutrition away from dairy output.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-6">
            <ShieldCheck size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Reproductive Nutrition</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Over 30% of conception failures relate to mineral deficiencies. Our advanced mineral and reproductive formulations actively secure long-term reproductive intervals.
          </p>
        </div>

      </div>

      {/* Official Certifications & Registrations */}
      <div className="mt-24 border-t border-gray-100 pt-16">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-6 tracking-tight">Official Certifications & Registrations</h2>
        <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
          Kashish Life Science® is officially recognized and certified by leading governmental and quality assurance regulatory bodies in India.
        </p>
        
        {/* Images Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center">
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2 w-full text-center">Udyam Registration</h3>
            <div className="w-full aspect-[1/1.4] rounded-lg overflow-y-auto border border-gray-100 bg-gray-50 flex flex-col items-center p-2 gap-4">
              <img src="/Udyam Registration number.jpeg" alt="Udyam Registration Page 1" className="w-full h-auto object-contain shadow-sm rounded-sm bg-white" />
              <img src="/Udyam Registration number 2.jpeg" alt="Udyam Registration Page 2" className="w-full h-auto object-contain shadow-sm rounded-sm bg-white" />
            </div>
            <div className="flex gap-6 mt-4">
              <a href="/Udyam Registration number.jpeg" target="_blank" className="text-green-600 hover:text-green-700 hover:underline text-sm font-semibold transition-colors">View PG 1</a>
              <a href="/Udyam Registration number 2.jpeg" target="_blank" className="text-green-600 hover:text-green-700 hover:underline text-sm font-semibold transition-colors">View PG 2</a>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center">
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2 w-full text-center">MSME Certificate</h3>
            <div className="relative w-full aspect-[1/1.4] overflow-hidden rounded-lg bg-gray-50">
              <Image src="/MSME.jpeg" alt="MSME Certificate" fill className="object-contain" unoptimized />
            </div>
            <a href="/MSME.jpeg" target="_blank" className="mt-4 text-green-600 hover:underline text-sm font-semibold">View Full Screen</a>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center">
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2 w-full text-center">ISO Registration Certificate</h3>
            <div className="relative w-full aspect-[1/1.4] overflow-hidden rounded-lg bg-gray-50">
              <Image src="/Iso registration certificate.jpeg" alt="ISO Registration Certificate" fill className="object-contain" unoptimized />
            </div>
            <a href="/Iso registration certificate.jpeg" target="_blank" className="mt-4 text-green-600 hover:underline text-sm font-semibold">View Full Screen</a>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center">
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2 w-full text-center">GMP Certificate</h3>
            <div className="relative w-full aspect-[1/1.4] overflow-hidden rounded-lg bg-gray-50">
              <Image src="/GMP certificate.jpeg" alt="GMP Certificate" fill className="object-contain" unoptimized />
            </div>
            <a href="/GMP certificate.jpeg" target="_blank" className="mt-4 text-green-600 hover:underline text-sm font-semibold">View Full Screen</a>
          </div>
        </div>

        {/* GST Invoice PDF Document */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center">
          <h3 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4 w-full text-center">Official GST Documentation</h3>
          <div className="w-full h-[600px] lg:h-[800px] rounded-xl overflow-hidden border border-gray-300 bg-gray-100">
            <object data="/GST invoice.pdf" type="application/pdf" className="w-full h-full">
              <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-gray-50">
                <p className="text-gray-600 mb-4">Your browser does not cleanly support embedded PDFs.</p>
                <a href="/GST invoice.pdf" target="_blank" className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold shadow-sm hover:bg-green-700 transition">
                  Click Here to View GST PDF
                </a>
              </div>
            </object>
          </div>
        </div>
      </div>
    </div>
  );
}
