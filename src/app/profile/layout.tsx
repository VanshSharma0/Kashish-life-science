import React from 'react';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">Your Account</h1>
      {children}
    </div>
  );
}
