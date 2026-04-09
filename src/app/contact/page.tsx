"use client";
import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Get in Touch</h1>
        <p className="text-lg text-gray-500">
          Have questions about our products or need veterinary support? We are here to help.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="flex flex-col items-center p-8 bg-green-50 rounded-2xl text-center border border-green-100">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-green-600 mb-6 shadow-sm">
            <MapPin size={24} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Our Location</h3>
          <p className="text-gray-600">Bulandshahr, Uttar Pradesh<br/>India</p>
        </div>
        <div className="flex flex-col items-center p-8 bg-green-50 rounded-2xl text-center border border-green-100">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-green-600 mb-6 shadow-sm">
            <Phone size={24} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Phone Number</h3>
          <p className="text-gray-600">+91 XXXXXXXXXX<br/>Mon-Sat 9am to 6pm</p>
        </div>
        <div className="flex flex-col items-center p-8 bg-green-50 rounded-2xl text-center border border-green-100">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-green-600 mb-6 shadow-sm">
            <Mail size={24} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Email Address</h3>
          <p className="text-gray-600">info@kashishlife.com<br/>support@kashishlife.com</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
        <form className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input type="text" id="name" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none" placeholder="John Doe" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input type="email" id="email" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none" placeholder="john@example.com" />
            </div>
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
            <input type="text" id="subject" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none" placeholder="How can we help?" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea id="message" rows={5} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none" placeholder="Write your message here..."></textarea>
          </div>
          <Button type="submit" size="lg" className="w-full" onClick={(e) => e.preventDefault()}>
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
}
