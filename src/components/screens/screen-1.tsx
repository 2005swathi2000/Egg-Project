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
      {/* Space above the board */}
      <div className="mt-8" />

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
