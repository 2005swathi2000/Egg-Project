"use client";

import React from "react";
import { Minus, Plus } from "lucide-react";
import { TrayType } from "../types";
import { useAppStore } from "../context/store";

interface QuantitySelectorProps {
  id: TrayType;
  quantity: number;
  onWarning: (msg: string) => void;
}

export default function QuantitySelector({ id, quantity, onWarning }: QuantitySelectorProps) {
  const { updateQuantity } = useAppStore();

  const handleDecrease = () => {
    if (quantity > 0) {
      updateQuantity(id, quantity - 1);
    }
  };

  const handleIncrease = () => {
    const result = updateQuantity(id, quantity + 1);
    if (!result.success && result.message) {
      onWarning(result.message);
    }
  };

  return (
    <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-full px-2 py-1 select-none">
      {/* Decrement Button */}
      <button
        onClick={handleDecrease}
        disabled={quantity <= 0}
        className="w-8 h-8 rounded-full flex items-center justify-center bg-white border border-amber-200 text-amber-950 hover:bg-amber-100 disabled:opacity-50 disabled:hover:bg-white transition active:scale-90"
      >
        <Minus className="w-4 h-4 stroke-[3]" />
      </button>

      {/* Display Value */}
      <span className="w-6 text-center font-bold text-lg text-amber-950">
        {String(quantity).padStart(2, "0")}
      </span>

      {/* Increment Button */}
      <button
        onClick={handleIncrease}
        className="w-8 h-8 rounded-full flex items-center justify-center bg-amber-500 text-white hover:bg-amber-600 transition active:scale-90"
      >
        <Plus className="w-4 h-4 stroke-[3]" />
      </button>
    </div>
  );
}
