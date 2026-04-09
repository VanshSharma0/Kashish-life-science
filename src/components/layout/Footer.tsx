import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Leaf, MapPin, Mail, Phone } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-emerald-950 text-emerald-50 border-t border-emerald-900 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border border-emerald-800 bg-white">
                <Image src="/logo.jpeg" alt="Kashish Life Science Logo" fill className="object-contain" />
              </div>
              <span className="font-bold text-2xl text-white tracking-tight">
                Kashish Life
              </span>
            </Link>
            <p className="text-emerald-200/80 leading-relaxed text-sm max-w-xs">
              Built under Make in India process, providing a one step solution for the Indian Veterinary industry with high quality cattle feed supplements and medicines.
            </p>
            <div className="flex gap-4">
              <span className="px-3 py-1 bg-emerald-900 rounded-full text-xs font-semibold text-emerald-300 border border-emerald-800">GMP Certified</span>
              <span className="px-3 py-1 bg-emerald-900 rounded-full text-xs font-semibold text-emerald-300 border border-emerald-800">ISO Registered</span>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 text-lg tracking-wide">Quick Links</h3>
            <ul className="space-y-4 text-emerald-200/80 text-sm">
              <li><Link href="/" className="hover:text-green-400 transition-colors">Home</Link></li>
              <li><Link href="/products" className="hover:text-green-400 transition-colors">Our Products</Link></li>
              <li><Link href="/about" className="hover:text-green-400 transition-colors">About the Company</Link></li>
              <li><Link href="/contact" className="hover:text-green-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 text-lg tracking-wide">Contact</h3>
            <ul className="space-y-4 text-emerald-200/80 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-green-500 shrink-0 mt-0.5" />
                <a href="https://www.google.com/maps/dir//Kashish+life+science,+9RVP%2BM96,+Shri+Krishna+Rd,+Amba+Enclave,+Bulandshahr,+Uttar+Pradesh+203002/@28.405901,77.855751,14z/data=!4m8!4m7!1m0!1m5!1m1!1s0x390ca5f77568f7af:0x4399fc6468f928a4!2m2!1d77.8358822!2d28.3941616?hl=en-IN&entry=ttu&g_ep=EgoyMDI2MDQwNi4wIKXMDSoASAFQAw%3D%3D"> <span>Shri Krishna Road, Amba Enclave,<br></br> Bulandshahr-203001<br/> <span></span>Uttar Pradesh, India</span> </a>
                

              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-green-500 shrink-0" />
                <span>+91 9837730011</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-green-500 shrink-0" />
                <a href="mailto:kashishlifescience@gmail.com" className="hover:text-green-300 transition-colors">kashishlifescience@gmail.com</a>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="mt-16 pt-8 border-t border-emerald-900 text-center text-sm text-emerald-400/60 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Kashish Life Science. All rights reserved.</p>
          <p>Proudly Made in India</p>
        </div>
      </div>
    </footer>
  );
};
