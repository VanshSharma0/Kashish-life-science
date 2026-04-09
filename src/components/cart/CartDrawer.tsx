"use client";

import React, { useEffect, useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Button } from '../ui/Button';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export const CartDrawer = () => {
  const { items, isCartOpen, closeCart, updateQuantity, removeItem, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const totalAmount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
        resolve(true); return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCheckout = async () => {
    if (!user) return;
    setIsCheckingOut(true);
    try {
      const res = await loadRazorpay();
      if (!res) throw new Error("Razorpay SDK failed to load. Are you online?");

      const orderData = await fetch('/api/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          totalAmount,
          userId: user.uid,
          email: user.email,
          customerName: user.displayName || user.email?.split('@')[0] || "Customer",
          phone: "9999999999" // Fallback since UI doesn't collect phone yet
        }),
      }).then(r => r.json());

      if (orderData.error) throw new Error(orderData.error);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_dummykey123',
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "Kashish Life Science",
        description: "Veterinary Products Checkout",
        order_id: orderData.order.id,
        handler: async function (response: any) {
          const verifyData = await fetch('/api/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            })
          }).then(r => r.json());
          
          if (verifyData.error) {
            alert("Verification Failed!");
          } else {
            clearCart();
            closeCart();
            router.push('/profile/orders');
          }
        },
        prefill: {
          name: user.displayName || user.email?.split('@')[0],
          email: user.email,
          contact: "9999999999"
        },
        theme: {
          color: "#10b981"
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        alert("Payment sequence cancelled or failed.");
      });
      rzp.open();
    } catch (err: any) {
      console.error(err);
      alert("Checkout failed: " + err.message);
    }
    setIsCheckingOut(false);
  };

  return (
    <>
      {/* Backdrop */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 transition-opacity"
          onClick={closeCart}
        />
      )}
      
      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-2 text-xl font-bold text-gray-800">
            <ShoppingBag className="text-green-600" />
            Your Cart
          </div>
          <button onClick={closeCart} className="p-2 text-gray-500 hover:text-gray-700 bg-gray-50 rounded-full transition-colors cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4">
              <ShoppingBag size={48} className="text-gray-200" />
              <p>Your cart is empty.</p>
              <Button onClick={closeCart} variant="outline">Continue Shopping</Button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-white border border-gray-100 flex-shrink-0">
                  <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 flex flex-col min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-semibold text-sm text-gray-800 line-clamp-2">{item.name}</h4>
                    <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 cursor-pointer flex-shrink-0">
                      <X size={16} />
                    </button>
                  </div>
                  <p className="text-sm font-medium text-gray-500 mb-auto mt-1">₹{item.price}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-200 cursor-pointer text-gray-600 transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-200 cursor-pointer text-gray-600 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-100 p-4 bg-gray-50 mt-auto">
            <div className="flex justify-between items-center mb-4 text-lg font-bold">
              <span className="text-gray-600">Total</span>
              <span className="text-green-700">₹{totalAmount}</span>
            </div>
            {user ? (
              <Button 
                className="w-full h-12 text-lg disabled:opacity-50" 
                onClick={handleCheckout} 
                disabled={isCheckingOut}
              >
                {isCheckingOut ? "Processing..." : `Checkout • ₹${totalAmount}`}
              </Button>
            ) : (
              <div className="space-y-3">
                <p className="text-center text-sm text-yellow-600 bg-yellow-50 p-2 rounded-lg">You must sign in to secure your order.</p>
                <Button className="w-full h-12 text-lg" onClick={() => {
                  closeCart();
                  router.push('/login?next=/products');
                }}>
                  Sign In to Checkout
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};
