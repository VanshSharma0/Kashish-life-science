import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Mail, Phone } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-blue-950 text-blue-50 border-t border-blue-900 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border border-blue-800 bg-white">
                <Image src="/logo.jpeg" alt="Kashish Life Science® Logo" fill className="object-contain" />
              </div>
              <span className="font-bold text-2xl text-white tracking-tight">
                Kashish <span className="text-blue-400">Life Science®</span>
              </span>
            </Link>
            <p className="text-blue-200/80 leading-relaxed text-sm max-w-xs">
              Built under Make in India process, providing a one step solution for the Indian Veterinary industry with high quality cattle feed supplements and medicines.
            </p>
            <div className="flex flex-wrap gap-2">
              {['ISO Certified', 'FSSAI Registered', 'GMP Certified', 'MSME Certified'].map((label) => (
                <span
                  key={label}
                  className="px-3 py-1 bg-blue-900 rounded-full text-xs font-semibold text-blue-300 border border-blue-800"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 text-lg tracking-wide">Quick Links</h3>
            <ul className="space-y-4 text-blue-200/80 text-sm">
              <li><Link href="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link href="/products" className="hover:text-blue-400 transition-colors">Our Products</Link></li>
              <li><Link href="/about" className="hover:text-blue-400 transition-colors">About the Company</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 text-lg tracking-wide">Contact</h3>
            <ul className="space-y-4 text-blue-200/80 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-500 shrink-0 mt-0.5" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=9RVP%2BM89%2C%20Bulandshahr%2C%20Uttar%20Pradesh%20203001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-300 transition-colors"
                >
                  <span>
                    9RVP+M89
                    <br />
                    Bulandshahr, Uttar Pradesh - 203001
                  </span>
                </a>
                

              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-blue-500 shrink-0" />
                <span>+91 9837730011</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-blue-500 shrink-0" />
                <a href="mailto:kashishlifescience@gmail.com" className="hover:text-blue-300 transition-colors">kashishlifescience@gmail.com</a>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="mt-16 pt-8 border-t border-blue-900 text-center text-sm text-blue-400/60 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Kashish Life Science®. All rights reserved.</p>
          <p>Proudly Made in India</p>
        </div>
      </div>
    </footer>
  );
};
