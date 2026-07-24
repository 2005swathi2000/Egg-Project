"use client";

import React, { useState } from "react";
import { useAppStore } from "../../context/store";
import { EGG_TRAYS } from "../../utils/constants";
import QuantitySelector from "../quantity-selector";
import BottomSheet from "../bottom-sheet";
import { AlertCircle, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TrayType } from "../../types";

export default function Screen3() {
  const { cart, addTrayToCart, removeTrayFromCart, updateQuantity, setScreen } = useAppStore();
  const [warning, setWarning] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Trigger temporary stock warning
  const triggerWarning = (msg: string) => {
    setWarning(msg);
    setTimeout(() => {
      setWarning(null);
    }, 3000);
  };

  const handleTrayClick = (id: TrayType) => {
    const exists = cart.find((item) => item.id === id);
    if (!exists) {
      addTrayToCart(id);
    } else {
      setIsCartOpen(true);
    }
  };

  // Find quantity in cart
  const getQty = (id: TrayType) => {
    return cart.find((item) => item.id === id)?.quantity || 0;
  };

  // Total trays selected
  const totalTrays = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Price calculations
  const calculateTotal = () => {
    return cart.reduce((sum, item) => {
      const trayInfo = EGG_TRAYS.find((t) => t.id === item.id);
      return sum + (trayInfo ? trayInfo.basePrice * item.quantity : 0);
    }, 0);
  };

  const handleProceedToSummary = () => {
    if (totalTrays === 0) {
      triggerWarning("Please select at least one egg tray");
      return;
    }
    setIsCartOpen(false);
    setScreen(4); // Navigate to Order Summary
  };

  return (
    <div className="relative flex-1 flex flex-col justify-between bg-[#FAF8F5] select-none overflow-hidden">
      {/* Decorative header */}
      <div 
        className="h-28 bg-cover bg-center flex items-end justify-center pb-2 select-none"
        style={{ backgroundImage: "url('/images/page_6_img_1.png')" }}
      >
        <span className="font-extrabold text-2xl text-amber-950 font-serif drop-shadow-sm select-none">
          Fresh Eggs
        </span>
      </div>

      {/* Warning Toast */}
      <AnimatePresence>
        {warning && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="absolute top-4 left-4 right-4 z-50 bg-red-500 text-white px-4 py-3 rounded-2xl flex items-center gap-3 shadow-lg border border-red-400"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-extrabold">{warning}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main egg tray list */}
      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-5 select-none pb-24">
        {EGG_TRAYS.map((tray) => {
          const qty = getQty(tray.id);
          const isSelected = qty > 0;

          return (
            <div
              key={tray.id}
              onClick={() => handleTrayClick(tray.id)}
              className={`flex flex-col gap-4 p-4 rounded-3xl border bg-white select-none transition ${
                isSelected 
                  ? "border-amber-500 shadow-md ring-2 ring-amber-500/20" 
                  : "border-zinc-100 shadow-sm hover:border-amber-200 cursor-pointer"
              }`}
            >
              {/* Product Info Row */}
              <div className="flex items-center gap-4 select-none">
                <div className="w-24 h-16 bg-zinc-50 border border-zinc-100 rounded-2xl overflow-hidden flex items-center justify-center flex-shrink-0">
                  <img
                    src={tray.image}
                    alt={tray.name}
                    className="w-full h-full object-cover select-none"
                  />
                </div>
                <div className="flex-1 flex flex-col select-none">
                  <h3 className="font-extrabold text-lg text-zinc-900 leading-tight">
                    {tray.name}
                  </h3>
                  <p className="text-xs font-semibold text-zinc-500 mt-0.5">
                    {tray.description}
                  </p>
                  <p className="font-black text-xl text-amber-950 mt-1">
                    ₹{tray.basePrice}
                  </p>
                </div>
              </div>

              {/* Action row (Add to cart / Quantity Selector) */}
              <div className="flex justify-between items-center border-t border-zinc-50 pt-3 select-none">
                <span className={`text-xs font-bold ${tray.id === "bulk" ? "text-red-500" : "text-zinc-400"}`}>
                  {tray.id === "bulk" ? `Low Stock : ${tray.stock}` : `In Stock : ${tray.stock}`}
                </span>
                
                {isSelected ? (
                  <div onClick={(e) => e.stopPropagation()}>
                    <QuantitySelector 
                      id={tray.id} 
                      quantity={qty} 
                      onWarning={triggerWarning} 
                    />
                  </div>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addTrayToCart(tray.id);
                    }}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-extrabold text-sm rounded-full shadow-sm transition select-none cursor-pointer"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Button Panel */}
      <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-white via-white to-transparent select-none">
        <button
          onClick={() => setIsCartOpen(true)}
          className="w-full py-4 bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white font-extrabold text-xl rounded-2xl shadow-lg border border-orange-400/50 flex items-center justify-center gap-3 transition select-none cursor-pointer"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>{totalTrays} {totalTrays === 1 ? "Tray" : "Trays"} • View Cart</span>
        </button>
      </div>

      {/* Bottom Sheet Cart Drawer */}
      <BottomSheet isOpen={isCartOpen} onClose={() => setIsCartOpen(false)}>
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center gap-2 select-none">
            <p className="text-zinc-500 font-semibold text-lg">Your cart is empty</p>
            <p className="text-zinc-400 text-sm">Select an egg tray above to get started</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6 select-none">
            {/* Cart item list */}
            <div className="flex flex-col gap-4">
              {cart.map((item) => {
                const tray = EGG_TRAYS.find((t) => t.id === item.id);
                if (!tray) return null;

                return (
                  <div key={item.id} className="flex items-center justify-between border-b border-zinc-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-10 bg-zinc-50 border border-zinc-100 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={tray.image} alt={tray.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-extrabold text-sm text-zinc-900 leading-none">{tray.name}</span>
                        <span className="font-bold text-amber-950 text-base mt-1">₹{tray.basePrice * item.quantity}</span>
                      </div>
                    </div>
                    <QuantitySelector 
                      id={item.id} 
                      quantity={item.quantity} 
                      onWarning={triggerWarning} 
                    />
                  </div>
                );
              })}
            </div>

            {/* Price Details */}
            <div className="bg-zinc-50 rounded-2xl p-4 flex flex-col gap-2 border border-zinc-100 select-none">
              <div className="flex justify-between font-semibold text-sm text-zinc-500">
                <span>Subtotal</span>
                <span>₹{calculateTotal()}</span>
              </div>
              <div className="flex justify-between font-black text-lg text-amber-950 border-t border-zinc-100 pt-2">
                <span>Grand Total</span>
                <span>₹{calculateTotal()}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleProceedToSummary}
              className="w-full py-4 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-extrabold text-lg rounded-2xl shadow-md transition select-none cursor-pointer"
            >
              Proceed to Summary
            </button>
          </div>
        )}
      </BottomSheet>
    </div>
  );
}
