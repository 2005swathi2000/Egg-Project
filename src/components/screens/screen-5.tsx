"use client";

import React from "react";
import { useAppStore } from "../../context/store";
import { EGG_TRAYS } from "../../utils/constants";
import { CreditCard as CardIcon, Wallet as WalletIcon, Landmark, ChevronRight } from "lucide-react";

export default function Screen5() {
  const { cart, paymentMethod, setPaymentMethod, setScreen } = useAppStore();

  const handleBack = () => {
    setScreen(4);
  };

  // Calculations
  const amountPayable = cart.reduce((sum, item) => {
    const tray = EGG_TRAYS.find((t) => t.id === item.id);
    return sum + (tray ? tray.basePrice * item.quantity : 0);
  }, 0);

  const selectMethodAndPay = (method: "upi" | "card" | "wallet" | "netbanking") => {
    setPaymentMethod(method);
    setScreen(6); // Navigate to Screen 6 QR Scanner
  };

  return (
    <div className="relative flex-1 flex flex-col justify-between bg-[#FAF8F5] select-none overflow-hidden pb-24">
      {/* Decorative header - Cursive style with no wood background banner */}
      <div className="pt-12 pb-4 flex justify-center select-none flex-shrink-0">
        <h1 className="text-4xl text-[#4A2F13] font-serif italic font-extrabold text-center drop-shadow-sm select-none">
          Payment
        </h1>
      </div>

      {/* Main Container */}
      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-5 select-none min-h-0">
        {/* Dashed Border Card */}
        <div className="border border-dashed border-zinc-300 rounded-3xl bg-white p-5 shadow-sm flex flex-col gap-4 flex-shrink-0">
          
          {/* Amount Payable Display */}
          <div className="flex flex-col items-center text-center pb-4 border-b border-zinc-100">
            <span className="text-sm font-semibold text-zinc-500">Amount Payable</span>
            <span className="font-black text-4xl text-amber-950 mt-1">₹{amountPayable}</span>
          </div>

          {/* Payment Methods selector (List container style) */}
          <div className="flex flex-col border border-zinc-100 rounded-2xl overflow-hidden bg-white">
            
            {/* UPI Option */}
            <button
              onClick={() => selectMethodAndPay("upi")}
              className="w-full flex items-center justify-between p-4 border-b border-zinc-50 hover:bg-zinc-50 transition text-left cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                {/* Simulated UPI badge icon */}
                <div className="flex items-center justify-center bg-zinc-100/80 rounded border border-zinc-200/50 px-1.5 py-0.5">
                  <span className="font-black italic text-[9px] tracking-tighter text-zinc-700">UPI</span>
                </div>
                <span className="font-extrabold text-zinc-800 text-sm">Pay via UPI</span>
              </div>
              <ChevronRight className="w-5 h-5 text-zinc-400" />
            </button>

            {/* Card Option */}
            <button
              onClick={() => selectMethodAndPay("card")}
              className="w-full flex items-center justify-between p-4 border-b border-zinc-50 hover:bg-zinc-50 transition text-left cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <CardIcon className="w-5 h-5 text-zinc-500" />
                <div className="flex flex-col">
                  <span className="font-extrabold text-zinc-800 text-sm leading-none">Card</span>
                  <span className="text-[10px] text-zinc-400 font-semibold mt-1">Credit/Debit Cards</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-zinc-400" />
            </button>

            {/* Wallet Option */}
            <button
              onClick={() => selectMethodAndPay("wallet")}
              className="w-full flex items-center justify-between p-4 border-b border-zinc-50 hover:bg-zinc-50 transition text-left cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <WalletIcon className="w-5 h-5 text-zinc-500" />
                <div className="flex flex-col">
                  <span className="font-extrabold text-zinc-800 text-sm leading-none">Wallet</span>
                  <span className="text-[10px] text-zinc-400 font-semibold mt-1">Phonepe, paytm..</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-zinc-400" />
            </button>

            {/* Net Banking Option */}
            <button
              onClick={() => selectMethodAndPay("netbanking")}
              className="w-full flex items-center justify-between p-4 hover:bg-zinc-50 transition text-left cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <Landmark className="w-5 h-5 text-zinc-500" />
                <span className="font-extrabold text-zinc-800 text-sm">Net Banking</span>
              </div>
              <ChevronRight className="w-5 h-5 text-zinc-400" />
            </button>

          </div>
        </div>

        {/* Razorpay Secured label */}
        <div className="flex justify-center items-center gap-1.5 text-xs text-zinc-500 font-bold mt-1">
          <span>Secured by</span>
          <div className="flex items-center gap-1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-4 h-4 text-sky-600">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="font-extrabold text-slate-800 text-sm italic tracking-tight">Razorpay</span>
          </div>
        </div>
      </div>

      {/* Bottom Button Panel */}
      <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5] to-transparent select-none z-10">
        <button
          onClick={() => selectMethodAndPay("upi")}
          className="w-full py-4 bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white font-extrabold text-2xl rounded-2xl shadow-lg border border-orange-400/50 flex items-center justify-center gap-3 transition select-none cursor-pointer"
        >
          <span>Pay ₹{amountPayable}</span>
        </button>
      </div>

      {/* Footer Image matching Screen 5 layout (grass and chick) */}
      <div className="absolute bottom-0 left-0 right-0 h-10 select-none pointer-events-none z-0">
        {/* Grass background */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-10 bg-repeat-x bg-bottom opacity-20"
          style={{ backgroundImage: "url('/images/0.png')", backgroundPosition: "bottom" }}
        />
      </div>

    </div>
  );
}
