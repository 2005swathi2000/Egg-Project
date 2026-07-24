"use client";

import React from "react";
import { useAppStore } from "../../context/store";
import { EGG_TRAYS } from "../../utils/constants";

export default function Screen6() {
  const { cart, setScreen } = useAppStore();

  // Calculations
  const amount = cart.reduce((sum, item) => {
    const tray = EGG_TRAYS.find((t) => t.id === item.id);
    return sum + (tray ? tray.basePrice * item.quantity : 0);
  }, 0);

  const handleCancel = () => {
    setScreen(5); // Go back to Payment page
  };

  return (
    <div className="relative flex-1 flex flex-col justify-between bg-[#FAF8F5] select-none overflow-hidden pb-24">
      {/* Decorative header - Cursive style with no wood background banner */}
      <div className="pt-12 pb-2 flex flex-col items-center justify-center select-none flex-shrink-0">
        <h1 className="text-4xl text-[#4A2F13] font-serif italic font-extrabold text-center drop-shadow-sm select-none">
          Scan & Pay
        </h1>
        <div className="flex flex-col items-center justify-center text-center mt-2">
          <span className="text-[13px] font-bold text-zinc-800 leading-snug">Scan QR code using</span>
          <span className="text-[13px] font-bold text-zinc-800 leading-snug">any UPI app</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-5 select-none min-h-0">
        
        {/* QR Code Dashed Card */}
        <div 
          onClick={() => setScreen(7)} // Click QR code to simulate payment completed!
          className="border border-dashed border-zinc-300 rounded-3xl bg-white p-5 shadow-sm flex items-center justify-center w-72 h-72 cursor-pointer hover:scale-[1.01] active:scale-95 transition"
          title="Click QR Code to simulate payment success"
        >
          <img 
            src="/images/page_6_img_2.png" 
            alt="Payment QR Code" 
            className="w-full h-full object-contain"
          />
        </div>

        {/* Amount & Status Block */}
        <div className="flex flex-col items-center text-center flex-shrink-0">
          <span className="text-xs font-black text-[#4A2F13]/70 uppercase tracking-widest">Amount</span>
          <span className="font-black text-4xl text-[#4A2F13] mt-1">₹{amount}</span>
          
          <span className="text-sm font-extrabold text-zinc-500 mt-4 tracking-wide animate-pulse">
            Waiting for the Payment...
          </span>
          <span className="text-xs font-semibold text-zinc-400 mt-1">
            Please Don't Close the Screen
          </span>
        </div>
      </div>

      {/* Bottom Cancel Button Panel */}
      <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5] to-transparent select-none z-10">
        <button
          onClick={handleCancel}
          className="w-full py-4 bg-[#FDBA74] hover:bg-orange-400 active:scale-[0.98] text-white font-extrabold text-2xl rounded-2xl shadow transition select-none cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
