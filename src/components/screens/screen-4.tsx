"use client";

import React, { useState } from "react";
import { useAppStore } from "../../context/store";
import { EGG_TRAYS } from "../../utils/constants";
import { ArrowLeft, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

const SwipeButton = ({ onSwipe }: { onSwipe: () => void }) => {
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <div className="w-full max-w-[320px] h-16 bg-orange-100 border border-orange-200 rounded-2xl relative flex items-center justify-between px-2 select-none overflow-hidden shadow-inner">
      {/* Background slide progress color */}
      <div className="absolute inset-0 bg-[#F97316] opacity-10" />

      {/* Track Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-sm font-black text-orange-950 uppercase tracking-widest animate-pulse">
          Swipe to Proceed
        </span>
      </div>

      {/* Draggable handle */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 240 }}
        dragElastic={0.1}
        dragMomentum={false}
        onDragEnd={(event, info) => {
          if (info.offset.x >= 200) {
            setIsCompleted(true);
            onSwipe();
          }
        }}
        className="w-12 h-12 bg-[#F97316] hover:bg-orange-600 rounded-xl flex items-center justify-center cursor-grab active:cursor-grabbing shadow-md z-10 text-white"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M13 17l5-5-5-5M6 17l5-5-5-5" />
        </svg>
      </motion.div>

      {/* End Target Indicator */}
      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-[#F97316] opacity-40 pr-2 pointer-events-none">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M13 17l5-5-5-5M6 17l5-5-5-5" />
        </svg>
      </div>
    </div>
  );
};

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
    <div className="relative flex-1 flex flex-col justify-between bg-[#FAF8F5] select-none overflow-hidden pb-24">
      {/* Decorative header - Cursive style with no wood background banner */}
      <div className="pt-12 pb-4 flex justify-center select-none flex-shrink-0">
        <h1 className="text-4xl text-[#4A2F13] font-serif italic font-extrabold text-center drop-shadow-sm select-none">
          Fresh Eggs
        </h1>
      </div>

      {/* Main Container */}
      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-5 select-none min-h-0">
        {/* Order Summary Card */}
        <div className="bg-white border border-zinc-100 rounded-3xl p-5 shadow-sm flex flex-col gap-4 flex-shrink-0">
          <h3 className="font-extrabold text-lg text-zinc-900 border-b border-zinc-50 pb-2">
            Order Summary
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
                      <div className="w-14 h-10 bg-zinc-50 border border-zinc-100 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={tray.image} alt={tray.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-extrabold text-sm text-zinc-900 leading-none">{tray.name}</span>
                        <span className="text-[10px] font-semibold text-zinc-400 mt-0.5">{tray.description}</span>
                        <span className="font-black text-sm text-zinc-900 mt-1">₹{tray.basePrice}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-black text-zinc-800 text-lg">x{item.quantity}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Add More Button */}
          <button
            onClick={handleBack}
            className="self-end px-4 py-1.5 rounded-full bg-[#F97316] text-white font-extrabold text-xs hover:bg-orange-600 active:scale-95 transition mt-2 cursor-pointer shadow-sm"
          >
            Add More
          </button>
        </div>

        {/* Price Details Card (Dashed Border Card) */}
        <div className="border border-dashed border-zinc-300 rounded-3xl p-5 bg-white shadow-sm flex flex-col gap-3 flex-shrink-0">
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
          </div>
        </div>

        {/* Total Display Outside Dashed Card */}
        <div className="flex justify-between items-center px-2 flex-shrink-0">
          <span className="font-black text-2xl text-zinc-800">Total</span>
          <span className="font-black text-3xl text-zinc-900">₹{grandTotal}</span>
        </div>
      </div>

      {/* Bottom Swipe Button Panel */}
      <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5] to-transparent select-none z-10 flex justify-center">
        <SwipeButton onSwipe={handleProceed} />
      </div>
    </div>
  );
}
