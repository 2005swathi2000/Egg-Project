"use client";

import React from "react";
import { useAppStore } from "../../context/store";
import { EGG_TRAYS } from "../../utils/constants";
import { ArrowLeft, CreditCard } from "lucide-react";

export default function Screen4() {
  const { cart, setScreen } = useAppStore();

  const handleBack = () => {
    setScreen(3);
  };

  const handleProceed = () => {
    setScreen(5); // Proceed to Payment Screen
  };

  // Calculations
  const subtotal = cart.reduce((sum, item) => {
    const tray = EGG_TRAYS.find((t) => t.id === item.id);
    return sum + (tray ? tray.basePrice * item.quantity : 0);
  }, 0);

  const grandTotal = subtotal;

  return (
    <div className="relative flex-1 flex flex-col justify-between bg-[#FAF8F5] select-none overflow-hidden pb-6">
      {/* Decorative header */}
      <div 
        className="h-28 bg-cover bg-center flex items-end justify-center pb-2 select-none"
        style={{ backgroundImage: "url('/images/page_6_img_1.png')" }}
      >
        <span className="font-extrabold text-2xl text-amber-950 font-serif drop-shadow-sm select-none">
          Order Summary
        </span>
      </div>

      {/* Main Container */}
      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-6 select-none pb-24">
        {/* Order Summary Card */}
        <div className="bg-white border border-zinc-100 rounded-3xl p-5 shadow-sm flex flex-col gap-4">
          <h3 className="font-extrabold text-lg text-zinc-900 border-b border-zinc-50 pb-2">
            Items Selected
          </h3>
          
          {cart.length === 0 ? (
            <p className="text-zinc-500 font-semibold text-center py-4">No items in cart</p>
          ) : (
            <div className="flex flex-col gap-4">
              {cart.map((item) => {
                const tray = EGG_TRAYS.find((t) => t.id === item.id);
                if (!tray) return null;

                return (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-10 bg-zinc-50 border border-zinc-100 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={tray.image} alt={tray.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-extrabold text-sm text-zinc-900">{tray.name}</span>
                        <span className="text-xs font-semibold text-zinc-500">{tray.description}</span>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <span className="font-bold text-zinc-900 text-sm">x{item.quantity}</span>
                      <span className="font-black text-amber-950 text-sm mt-0.5">₹{tray.basePrice * item.quantity}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Add More Button */}
          <button
            onClick={handleBack}
            className="self-end px-4 py-1.5 rounded-full border border-amber-500 text-amber-600 font-extrabold text-xs hover:bg-amber-50 active:scale-95 transition mt-2 cursor-pointer"
          >
            Add More
          </button>
        </div>

        {/* Price Details Card */}
        <div className="bg-white border border-zinc-100 rounded-3xl p-5 shadow-sm flex flex-col gap-3">
          <h3 className="font-extrabold text-lg text-zinc-900 border-b border-zinc-50 pb-2">
            Price Details
          </h3>
          <div className="flex flex-col gap-2.5">
            {cart.map((item) => {
              const tray = EGG_TRAYS.find((t) => t.id === item.id);
              if (!tray) return null;
              return (
                <div key={item.id} className="flex justify-between font-semibold text-sm text-zinc-500">
                  <span>{tray.name} (x{item.quantity})</span>
                  <span>₹{tray.basePrice * item.quantity}</span>
                </div>
              );
            })}
            <div className="h-px bg-zinc-100 my-1" />
            <div className="flex justify-between font-semibold text-sm text-zinc-500">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between font-black text-xl text-amber-950 border-t border-zinc-100 pt-2.5">
              <span>Total</span>
              <span>₹{grandTotal}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Button Panel */}
      <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-white via-white to-transparent select-none">
        <button
          onClick={handleProceed}
          className="w-full py-4 bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white font-extrabold text-xl rounded-2xl shadow-lg border border-orange-400/50 flex items-center justify-center gap-3 transition select-none cursor-pointer"
        >
          <CreditCard className="w-5 h-5" />
          <span>Proceed to Pay</span>
        </button>
      </div>
    </div>
  );
}
