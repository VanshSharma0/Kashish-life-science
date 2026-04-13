"use client";
import React, { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [sentVia, setSentVia] = useState<'api' | 'mailto' | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    setSentVia(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus('error');
        setErrorMessage(typeof data.error === 'string' ? data.error : 'Something went wrong. Please try again.');
        return;
      }

      if (data.sent === true) {
        setSentVia('api');
        setStatus('success');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
        return;
      }

      if (data.fallback && typeof data.mailto === 'string') {
        setSentVia('mailto');
        setStatus('success');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
        window.location.href = data.mailto;
        return;
      }

    } catch {
      setStatus('error');
      setErrorMessage('Network error. Check your connection and try again.');
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-20 sm:pt-8 lg:pt-10 lg:pb-28">

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
          Get in touch
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          Have questions about our products or need veterinary support? We are here to help.
        </p>
      </div>

      {/* Contact info cards */}
      <div className="grid md:grid-cols-3 gap-5 mb-14">
        <div className="flex flex-col items-center p-6 bg-blue-50 rounded-2xl text-center border border-blue-100">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 mb-4 border border-blue-100">
            <MapPin size={18} />
          </div>
          <h3 className="text-sm font-semibold text-gray-900 mb-1.5">Our location</h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            9RVP+M89 Bulandshahr<br />
            Uttar Pradesh — 203001<br />
            India
          </p>
        </div>

        <div className="flex flex-col items-center p-6 bg-blue-50 rounded-2xl text-center border border-blue-100">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 mb-4 border border-blue-100">
            <Phone size={18} />
          </div>
          <h3 className="text-sm font-semibold text-gray-900 mb-1.5">Phone number</h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            +91 98377 30011<br />
            Mon–Sat, 9 am to 6 pm
          </p>
        </div>

        <div className="flex flex-col items-center p-6 bg-blue-50 rounded-2xl text-center border border-blue-100">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 mb-4 border border-blue-100">
            <Mail size={18} />
          </div>
          <h3 className="text-sm font-semibold text-gray-900 mb-1.5">Email address</h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            kashishlifescience<br />@gmail.com
          </p>
        </div>
      </div>

      {/* Contact form */}
      <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">Send us a message</h2>
        </div>
        <div className="p-6">
          {status === 'success' && sentVia === 'api' && (
            <p className="mb-5 rounded-lg bg-blue-50 border border-blue-100 px-4 py-3 text-sm text-blue-900">
              Thank you — your message was sent. We will get back to you soon.
            </p>
          )}
          {status === 'success' && sentVia === 'mailto' && (
            <p className="mb-5 rounded-lg bg-blue-50 border border-blue-100 px-4 py-3 text-sm text-blue-900">
              Opening your email app with your message. If nothing opens, email us at kashishlifescience@gmail.com
            </p>
          )}
          {status === 'error' && errorMessage && (
            <p className="mb-5 rounded-lg bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-800">
              {errorMessage}
            </p>
          )}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-xs font-medium text-gray-600 mb-1.5">
                  Full name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none placeholder:text-gray-400"
                  placeholder="John Doe"
                  autoComplete="name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-gray-600 mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none placeholder:text-gray-400"
                  placeholder="john@example.com"
                  autoComplete="email"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-xs font-medium text-gray-600 mb-1.5">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none placeholder:text-gray-400"
                placeholder="How can we help?"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-xs font-medium text-gray-600 mb-1.5">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none placeholder:text-gray-400 resize-none"
                placeholder="Write your message here..."
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Sending…' : 'Send message'}
            </Button>
          </form>
        </div>
      </div>

    </div>
  );
}
