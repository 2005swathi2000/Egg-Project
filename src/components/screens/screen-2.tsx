"use client";

import React from "react";
import CountdownTimer from "../countdown-timer";

export default function Screen2() {
  return (
    <div 
      className="relative flex-1 flex flex-col justify-between bg-cover bg-center select-none"
      style={{ backgroundImage: "url('/images/screen_2_bg.png')" }}
    >
      {/* Circular timer positioned to the right of the Hen pointing in nest */}
      <div className="absolute bottom-[18%] right-[8%] z-10 flex flex-col items-center justify-center gap-1 bg-white border border-amber-200/40 p-3.5 rounded-3xl shadow-xl w-[140px] h-[170px]">
        <CountdownTimer />
        <span className="text-[10px] font-black text-amber-900/80 uppercase tracking-widest animate-pulse text-center select-none mt-1">
          Grab Your Tray
        </span>
      </div>
    </div>
  );
}
