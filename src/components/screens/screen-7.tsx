"use client";

import React from "react";
import DoorAnimation from "../door-animation";

export default function Screen7() {
  return (
    <div className="relative flex-1 flex flex-col justify-between bg-[#FAF8F5] select-none overflow-hidden pb-6">
      {/* Decorative header */}
      <div 
        className="h-28 bg-cover bg-center flex items-end justify-center pb-2 select-none"
        style={{ backgroundImage: "url('/images/page_6_img_1.png')" }}
      >
        <span className="font-extrabold text-2xl text-amber-950 font-serif drop-shadow-sm select-none">
          Payment Successful
        </span>
      </div>

      {/* Main Content containing Door Anim cards */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        {/* Animated tick success card */}
        <div className="flex flex-col items-center gap-3 mb-6 select-none">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center shadow-md animate-bounce">
            <img 
              src="/images/page_7_img_1.png" 
              alt="Success Tick" 
              className="w-8 h-8 object-contain"
            />
          </div>
          <span className="font-black text-2xl text-zinc-900 leading-none select-none">
            Success!
          </span>
          <span className="text-sm font-semibold text-zinc-500 text-center max-w-[200px]">
            Please collect your trays and close the door.
          </span>
        </div>

        {/* Door Cards controls */}
        <DoorAnimation />
      </div>
    </div>
  );
}
