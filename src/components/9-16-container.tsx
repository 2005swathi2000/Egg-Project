import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

export default function Container916({ children }: ContainerProps) {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-zinc-900 p-0 overflow-hidden select-none">
      <div className="relative h-full max-h-screen aspect-[9/16] max-w-full bg-[#FAF8F5] overflow-hidden flex flex-col shadow-2xl select-none">
        {children}
      </div>
    </div>
  );
}
