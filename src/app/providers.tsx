"use client";

import React, { useEffect, useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    // Show a loading backdrop during SSR/hydration to prevent mismatches
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-zinc-900 select-none">
        <div className="relative h-full max-h-screen aspect-[9/16] max-w-full bg-[#FAF8F5] flex flex-col items-center justify-center">
          <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
