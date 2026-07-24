"use client";

import React from "react";
import CountdownTimer from "../countdown-timer";

export default function Screen2() {
  return (
    <div 
      className="relative flex-1 flex flex-col justify-between p-6 bg-cover bg-center select-none"
      style={{ backgroundImage: "url('/images/0.png')" }}
    >
      {/* Welcome & Steps list on top */}
      <div className="mt-8 flex flex-col items-center bg-white/80 backdrop-blur-md border border-amber-200/50 rounded-3xl p-6 shadow-xl w-full">
        <h2 className="text-3xl font-extrabold text-amber-950 font-serif mb-1 select-none">
          Welcome
        </h2>
        <p className="text-sm font-semibold text-amber-800/80 mb-6 text-center select-none">
          Fresh Eggs Ready in Just 3 Simple Steps
        </p>

        {/* Steps */}
        <div className="flex flex-col gap-4 w-full px-2 select-none">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-amber-500 text-white font-extrabold flex items-center justify-center shadow-md">
              1
            </div>
            <span className="font-bold text-amber-950 text-base">Select Tray</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-amber-500 text-white font-extrabold flex items-center justify-center shadow-md">
              2
            </div>
            <span className="font-bold text-amber-950 text-base">Make Payment</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-amber-500 text-white font-extrabold flex items-center justify-center shadow-md">
              3
            </div>
            <span className="font-bold text-amber-950 text-base">Collect Eggs</span>
          </div>
        </div>
      </div>

      {/* Middle/Bottom space for timer, placed to the right of the Hen (which is bottom-left) */}
      <div className="mb-20 self-end mr-4 flex flex-col items-center gap-2 bg-white/95 backdrop-blur-sm border border-amber-200 p-4 rounded-3xl shadow-lg">
        <CountdownTimer />
        <span className="text-xs font-bold text-amber-900/80 uppercase tracking-widest animate-pulse select-none">
          Grab Your Tray
        </span>
      </div>
    </div>
  );
}
