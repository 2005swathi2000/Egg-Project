"use client";

import React, { useState } from "react";
import { useAppStore } from "../../context/store";
import { EGG_TRAYS } from "../../utils/constants";
import { PaymentMethod } from "../../types";
import { ArrowLeft, Check, Smartphone, CreditCard as CardIcon, Wallet as WalletIcon, Landmark } from "lucide-react";

export default function Screen5() {
  const { 
    cart, 
    paymentMethod, 
    paymentSubOption, 
    upiId, 
    cardDetails,
    setPaymentMethod, 
    setPaymentSubOption, 
    setUpiId, 
    setCardDetails, 
    setScreen 
  } = useAppStore();

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleBack = () => {
    setScreen(4);
  };

  // Calculations
  const amountPayable = cart.reduce((sum, item) => {
    const tray = EGG_TRAYS.find((t) => t.id === item.id);
    return sum + (tray ? tray.basePrice * item.quantity : 0);
  }, 0);

  // Formatting helpers
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value).slice(0, 19);
    setCardDetails({ cardNumber: formatted });
    if (formErrors.cardNumber) {
      setFormErrors((prev) => ({ ...prev, cardNumber: "" }));
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value).slice(0, 5);
    setCardDetails({ expiry: formatted });
    if (formErrors.expiry) {
      setFormErrors((prev) => ({ ...prev, expiry: "" }));
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = e.target.value.replace(/[^0-9]/gi, "").slice(0, 3);
    setCardDetails({ cvv: formatted });
    if (formErrors.cvv) {
      setFormErrors((prev) => ({ ...prev, cvv: "" }));
    }
  };

  const handleCardHolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardDetails({ cardHolder: e.target.value });
    if (formErrors.cardHolder) {
      setFormErrors((prev) => ({ ...prev, cardHolder: "" }));
    }
  };

  const validateInputs = () => {
    const errors: Record<string, string> = {};
    if (!paymentMethod) {
      errors.paymentMethod = "Please select a payment method";
      return errors;
    }

    if (paymentMethod === "upi") {
      if (!paymentSubOption) {
        errors.upi = "Please select a UPI app";
      } else if (paymentSubOption === "Other" && !upiId) {
        errors.upiId = "Please enter your UPI ID";
      }
    } else if (paymentMethod === "card") {
      const cleanNum = cardDetails.cardNumber.replace(/\s/g, "");
      if (cleanNum.length !== 16) {
        errors.cardNumber = "Must be a 16-digit card number";
      }
      if (cardDetails.expiry.length !== 5 || !cardDetails.expiry.includes("/")) {
        errors.expiry = "Use MM/YY format";
      }
      if (cardDetails.cvv.length !== 3) {
        errors.cvv = "Must be 3 digits";
      }
      if (!cardDetails.cardHolder.trim()) {
        errors.cardHolder = "Required";
      }
    } else if (paymentMethod === "wallet") {
      if (!paymentSubOption) {
        errors.wallet = "Please select a wallet";
      }
    } else if (paymentMethod === "netbanking") {
      if (!paymentSubOption) {
        errors.bank = "Please select a bank";
      }
    }

    return errors;
  };

  const handlePay = () => {
    const errors = validateInputs();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    // Proceed to QR Scanner Screen (Screen 6)
    setScreen(6);
  };

  return (
    <div className="relative flex-1 flex flex-col justify-between bg-[#FAF8F5] select-none overflow-hidden pb-6">
      {/* Decorative header */}
      <div 
        className="h-28 bg-cover bg-center flex items-end justify-between px-6 pb-2 select-none"
        style={{ backgroundImage: "url('/images/page_6_img_1.png')" }}
      >
        <button onClick={handleBack} className="p-1 rounded-full bg-white/20 text-amber-950 backdrop-blur-sm cursor-pointer">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <span className="font-extrabold text-2xl text-amber-950 font-serif drop-shadow-sm select-none mr-8">
          Payment
        </span>
        <div className="w-8 h-8" />
      </div>

      {/* Main content scroll area */}
      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-5 select-none pb-24">
        {/* Amount Payable Display */}
        <div className="bg-white border border-zinc-100 rounded-3xl p-5 shadow-sm flex flex-col items-center text-center">
          <span className="text-sm font-semibold text-zinc-500">Amount Payable</span>
          <span className="font-black text-3xl text-amber-950 mt-1">₹{amountPayable}</span>
        </div>

        {/* Payment Methods selector */}
        <div className="flex flex-col gap-3">
          {formErrors.paymentMethod && (
            <p className="text-red-500 text-xs font-bold text-center">{formErrors.paymentMethod}</p>
          )}

          {/* UPI Option */}
          <div className={`rounded-3xl border transition overflow-hidden bg-white ${
            paymentMethod === "upi" ? "border-amber-500 shadow-md" : "border-zinc-100 shadow-sm"
          }`}>
            <button
              onClick={() => setPaymentMethod("upi")}
              className="w-full flex items-center justify-between p-4 font-extrabold text-zinc-900 text-base text-left"
            >
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-amber-600" />
                <span>Pay via UPI</span>
              </div>
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                paymentMethod === "upi" ? "border-amber-500 bg-amber-500 text-white" : "border-zinc-300"
              }`}>
                {paymentMethod === "upi" && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </button>
            
            {/* UPI Expanded options */}
            {paymentMethod === "upi" && (
              <div className="px-4 pb-4 pt-2 border-t border-zinc-50 flex flex-col gap-3">
                <span className="text-xs font-bold text-zinc-400">Popular UPI Apps</span>
                <div className="grid grid-cols-3 gap-2">
                  {["Google Pay", "PhonePe", "Paytm", "BHIM", "Amazon Pay", "Other"].map((app) => (
                    <button
                      key={app}
                      onClick={() => setPaymentSubOption(app)}
                      className={`py-2 px-1 text-center font-bold text-xs rounded-xl border transition ${
                        paymentSubOption === app 
                          ? "border-amber-500 bg-amber-50 text-amber-950 shadow-sm" 
                          : "border-zinc-100 hover:bg-zinc-50 text-zinc-600"
                      }`}
                    >
                      {app}
                    </button>
                  ))}
                </div>
                {formErrors.upi && <p className="text-red-500 text-xs font-bold">{formErrors.upi}</p>}

                {paymentSubOption === "Other" && (
                  <div className="flex flex-col gap-1.5 mt-2">
                    <label className="text-xs font-bold text-zinc-500">Enter UPI ID</label>
                    <input
                      type="text"
                      placeholder="username@bank"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="border border-zinc-200 rounded-xl px-3 py-2 text-sm font-semibold focus:outline-none focus:border-amber-500 bg-zinc-50"
                    />
                    {formErrors.upiId && <p className="text-red-500 text-xs font-bold">{formErrors.upiId}</p>}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Card Option */}
          <div className={`rounded-3xl border transition overflow-hidden bg-white ${
            paymentMethod === "card" ? "border-amber-500 shadow-md" : "border-zinc-100 shadow-sm"
          }`}>
            <button
              onClick={() => setPaymentMethod("card")}
              className="w-full flex items-center justify-between p-4 font-extrabold text-zinc-900 text-base text-left"
            >
              <div className="flex items-center gap-3">
                <CardIcon className="w-5 h-5 text-amber-600" />
                <span>Credit/Debit Cards</span>
              </div>
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                paymentMethod === "card" ? "border-amber-500 bg-amber-500 text-white" : "border-zinc-300"
              }`}>
                {paymentMethod === "card" && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </button>

            {/* Card Expanded Form */}
            {paymentMethod === "card" && (
              <div className="px-4 pb-4 pt-2 border-t border-zinc-50 flex flex-col gap-3 text-left">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-zinc-500">Card Number</label>
                  <input
                    type="text"
                    placeholder="xxxx xxxx xxxx xxxx"
                    value={cardDetails.cardNumber}
                    onChange={handleCardNumberChange}
                    className="border border-zinc-200 rounded-xl px-3 py-2 text-sm font-semibold focus:outline-none focus:border-amber-500 bg-zinc-50"
                  />
                  {formErrors.cardNumber && <p className="text-red-500 text-xs font-bold">{formErrors.cardNumber}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-zinc-500">Expiry</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={handleExpiryChange}
                      className="border border-zinc-200 rounded-xl px-3 py-2 text-sm font-semibold focus:outline-none focus:border-amber-500 bg-zinc-50"
                    />
                    {formErrors.expiry && <p className="text-red-500 text-xs font-bold">{formErrors.expiry}</p>}
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-zinc-500">CVV</label>
                    <input
                      type="password"
                      placeholder="xxx"
                      value={cardDetails.cvv}
                      onChange={handleCvvChange}
                      className="border border-zinc-200 rounded-xl px-3 py-2 text-sm font-semibold focus:outline-none focus:border-amber-500 bg-zinc-50"
                    />
                    {formErrors.cvv && <p className="text-red-500 text-xs font-bold">{formErrors.cvv}</p>}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-zinc-500">Card Holder Name</label>
                  <input
                    type="text"
                    placeholder="Name on card"
                    value={cardDetails.cardHolder}
                    onChange={handleCardHolderChange}
                    className="border border-zinc-200 rounded-xl px-3 py-2 text-sm font-semibold focus:outline-none focus:border-amber-500 bg-zinc-50"
                  />
                  {formErrors.cardHolder && <p className="text-red-500 text-xs font-bold">{formErrors.cardHolder}</p>}
                </div>
              </div>
            )}
          </div>

          {/* Wallet Option */}
          <div className={`rounded-3xl border transition overflow-hidden bg-white ${
            paymentMethod === "wallet" ? "border-amber-500 shadow-md" : "border-zinc-100 shadow-sm"
          }`}>
            <button
              onClick={() => setPaymentMethod("wallet")}
              className="w-full flex items-center justify-between p-4 font-extrabold text-zinc-900 text-base text-left"
            >
              <div className="flex items-center gap-3">
                <WalletIcon className="w-5 h-5 text-amber-600" />
                <span>Wallets</span>
              </div>
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                paymentMethod === "wallet" ? "border-amber-500 bg-amber-500 text-white" : "border-zinc-300"
              }`}>
                {paymentMethod === "wallet" && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </button>

            {/* Wallet expanded */}
            {paymentMethod === "wallet" && (
              <div className="px-4 pb-4 pt-2 border-t border-zinc-50 flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-2">
                  {["PhonePe Wallet", "Paytm Wallet", "Amazon Pay", "Mobikwik"].map((wallet) => (
                    <button
                      key={wallet}
                      onClick={() => setPaymentSubOption(wallet)}
                      className={`py-2 px-3 text-left font-bold text-xs rounded-xl border transition ${
                        paymentSubOption === wallet
                          ? "border-amber-500 bg-amber-50 text-amber-950 shadow-sm"
                          : "border-zinc-100 hover:bg-zinc-50 text-zinc-600"
                      }`}
                    >
                      {wallet}
                    </button>
                  ))}
                </div>
                {formErrors.wallet && <p className="text-red-500 text-xs font-bold">{formErrors.wallet}</p>}
              </div>
            )}
          </div>

          {/* Net Banking Option */}
          <div className={`rounded-3xl border transition overflow-hidden bg-white ${
            paymentMethod === "netbanking" ? "border-amber-500 shadow-md" : "border-zinc-100 shadow-sm"
          }`}>
            <button
              onClick={() => setPaymentMethod("netbanking")}
              className="w-full flex items-center justify-between p-4 font-extrabold text-zinc-900 text-base text-left"
            >
              <div className="flex items-center gap-3">
                <Landmark className="w-5 h-5 text-amber-600" />
                <span>Net Banking</span>
              </div>
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                paymentMethod === "netbanking" ? "border-amber-500 bg-amber-500 text-white" : "border-zinc-300"
              }`}>
                {paymentMethod === "netbanking" && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </button>

            {/* Net banking expanded */}
            {paymentMethod === "netbanking" && (
              <div className="px-4 pb-4 pt-2 border-t border-zinc-50 flex flex-col gap-3">
                <span className="text-xs font-bold text-zinc-400">Popular Banks</span>
                <div className="grid grid-cols-2 gap-2">
                  {["SBI", "HDFC", "ICICI", "Axis", "Canara", "Indian Bank"].map((bank) => (
                    <button
                      key={bank}
                      onClick={() => setPaymentSubOption(bank)}
                      className={`py-2 px-3 text-left font-bold text-xs rounded-xl border transition ${
                        paymentSubOption === bank
                          ? "border-amber-500 bg-amber-50 text-amber-950 shadow-sm"
                          : "border-zinc-100 hover:bg-zinc-50 text-zinc-600"
                      }`}
                    >
                      {bank}
                    </button>
                  ))}
                </div>
                {formErrors.bank && <p className="text-red-500 text-xs font-bold">{formErrors.bank}</p>}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Pay Button Panel */}
      <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-white via-white to-transparent select-none">
        <button
          onClick={handlePay}
          className="w-full py-4 bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white font-extrabold text-xl rounded-2xl shadow-lg border border-orange-400/50 flex items-center justify-center gap-3 transition select-none cursor-pointer"
        >
          <span>Pay ₹{amountPayable}</span>
        </button>
      </div>
    </div>
  );
}
