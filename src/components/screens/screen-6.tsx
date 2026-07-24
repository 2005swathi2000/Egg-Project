"use client";

import React, { useEffect, useState } from "react";
import { useAppStore } from "../../context/store";
import { EGG_TRAYS } from "../../utils/constants";
import { X, RefreshCw } from "lucide-react";

export default function Screen6() {
  const { cart, setScreen } = useAppStore();
  const [secondsRemaining, setSecondsRemaining] = useState(3);

  // Calculations
  const amount = cart.reduce((sum, item) => {
    const tray = EGG_TRAYS.find((t) => t.id === item.id);
    return sum + (tray ? tray.basePrice * item.quantity : 0);
  }, 0);

  useEffect(() => {
    // 3-second timer before simulating success
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setScreen(7); // Proceed to Screen 7 (Payment Success & Door)
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCancel = () => {
    setScreen(5);
  };

  return (
    <div className="relative flex-1 flex flex-col justify-between bg-[#FAF8F5] select-none overflow-hidden pb-6">
      {/* Decorative header */}
      <div 
        className="h-28 bg-cover bg-center flex items-end justify-center pb-2 select-none"
        style={{ backgroundImage: "url('/images/page_6_img_1.png')" }}
      >
        <span className="font-extrabold text-2xl text-amber-950 font-serif drop-shadow-sm select-none">
          Scan & Pay
        </span>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 gap-6 select-none">
        <span className="text-sm font-bold text-zinc-500 text-center max-w-[200px]">
          Scan QR code using any UPI app
        </span>

        {/* QR Code Container */}
        <div className="relative w-64 h-64 bg-white border border-zinc-200 rounded-3xl p-5 shadow-lg flex items-center justify-center">
          <img 
            src="/images/page_6_img_2.png" 
            alt="Payment QR Code" 
            className="w-full h-full object-contain"
          />
        </div>

        {/* Amount & Status Block */}
        <div className="flex flex-col items-center text-center gap-2">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Amount</span>
          <span className="font-black text-4xl text-amber-950 leading-none">₹{amount}</span>
          
          {/* Polling Animation */}
          <div className="flex items-center gap-2 mt-4 text-amber-700 bg-amber-50 px-4 py-2 rounded-full border border-amber-200">
            <RefreshCw className="w-4 h-4 animate-spin stroke-[2.5]" />
            <span className="text-sm font-extrabold tracking-wide">Waiting for the Payment...</span>
          </div>
          
          <span className="text-xs font-semibold text-zinc-400 mt-1">
            Please Don't Close the Screen
          </span>
        </div>
      </div>

      {/* Bottom Cancel Button Panel */}
      <div className="px-6 select-none">
        <button
          onClick={handleCancel}
          className="w-full py-4 bg-zinc-200 hover:bg-zinc-300 active:scale-[0.98] text-zinc-800 font-extrabold text-xl rounded-2xl shadow transition select-none cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
