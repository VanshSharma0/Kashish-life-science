"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Menu, X, User as UserIcon } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useAuth } from '@/context/AuthContext';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { openCart, items } = useCartStore();
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartItemsCount = mounted ? items.reduce((acc, item) => acc + item.quantity, 0) : 0;

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header 
      className={`fixed top-0 inset-x-0 z-30 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-white py-5'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-100 shadow-sm">
              <Image src="/logo.jpeg" alt="Kashish Life Science Logo" fill className="object-cover" />
            </div>
            <span className="font-bold text-xl md:text-2xl text-gray-900 tracking-tight">
              Kashish <span className="text-green-600">Life</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-green-600 ${
                  pathname === link.href ? 'text-green-600' : 'text-gray-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            {user ? (
              <Link href="/profile" className="p-2 text-gray-600 hover:text-green-600 transition-colors" aria-label="Profile">
                <UserIcon size={24} />
              </Link>
            ) : (
              <Link href="/login" className="hidden sm:block text-sm font-semibold text-green-600 border border-green-600 px-4 py-2 rounded-full hover:bg-green-50 transition-colors bg-white">
                Sign In
              </Link>
            )}
            <button 
              onClick={openCart}
              className="relative p-2 text-gray-600 hover:text-green-600 transition-colors cursor-pointer"
              aria-label="Open cart"
            >
              <ShoppingBag size={24} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-green-500 text-[10px] text-white flex items-center justify-center font-bold border-2 border-white">
                  {cartItemsCount}
                </span>
              )}
            </button>
            <button 
              className="md:hidden p-2 text-gray-600 cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-lg select-none">
          <div className="flex flex-col space-y-4 p-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-medium ${pathname === link.href ? 'text-green-600' : 'text-gray-800'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
