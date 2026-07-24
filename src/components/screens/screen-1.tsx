"use client";

import React from "react";
import { useNavigation } from "../../hooks/useNavigation";

export default function Screen1() {
  const { startPurchaseFlow } = useNavigation();

  return (
    <div 
      className="relative flex-1 flex flex-col justify-between p-6 bg-cover bg-center select-none"
      style={{ backgroundImage: "url('/images/0.png')" }}
    >
      {/* Top Header Card Overlaid on Wooden Sign */}
      <div className="mt-8 flex flex-col items-center text-center px-4 py-6 rounded-2xl bg-white/10 backdrop-blur-[2px] border border-white/20 shadow-sm">
        <h1 className="text-4xl font-extrabold text-amber-950 tracking-wide font-serif drop-shadow-sm select-none">
          Fresh Eggs
        </h1>
        <p className="text-sm font-bold text-amber-900 mt-1 uppercase tracking-wider select-none">
          Fresh • Hygiene • Local
        </p>
        <div className="h-px w-20 bg-amber-800/40 my-3" />
        <p className="text-xs font-bold text-amber-900/80 leading-relaxed max-w-[200px] select-none">
          100% Fresh High Protein Naturally Sourced
        </p>
      </div>

      {/* Bottom Button (Tap to Start) */}
      <div className="mb-8 w-full flex justify-center">
        <button
          onClick={startPurchaseFlow}
          className="w-full max-w-[320px] py-4 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-extrabold text-2xl rounded-2xl shadow-lg border-2 border-orange-400/50 uppercase tracking-wider transition select-none cursor-pointer"
        >
          Tap to Start
        </button>
      </div>
    </div>
  );
}
