import { create } from "zustand";
import { TrayType, CartItem, PaymentMethod, DoorStatus, CardDetails } from "../types";

export interface AppState {
  currentScreen: number;
  cart: CartItem[];
  stock: Record<TrayType, number>;
  paymentMethod: PaymentMethod | null;
  paymentSubOption: string | null;
  upiId: string;
  cardDetails: CardDetails;
  doorStatus: DoorStatus;
  isAdActive: boolean;
  adIndex: number;
  
  // Navigation
  setScreen: (screen: number) => void;
  setAdActive: (active: boolean) => void;
  setAdIndex: (idx: number) => void;
  
  // Cart Actions
  addTrayToCart: (id: TrayType) => void;
  removeTrayFromCart: (id: TrayType) => void;
  updateQuantity: (id: TrayType, qty: number) => { success: boolean; message?: string };
  
  // Payment Actions
  setPaymentMethod: (method: PaymentMethod | null) => void;
  setPaymentSubOption: (option: string | null) => void;
  setUpiId: (id: string) => void;
  setCardDetails: (details: Partial<CardDetails>) => void;
  
  // Door Actions
  setDoorStatus: (status: DoorStatus) => void;
  
  // Reset Actions
  resetCart: () => void;
  resetAll: () => void;
}

const initialCardDetails: CardDetails = {
  cardNumber: "",
  expiry: "",
  cvv: "",
  cardHolder: "",
};

export const useAppStore = create<AppState>((set, get) => ({
  currentScreen: 1,
  cart: [],
  stock: {
    mini: 40,
    medium: 40,
    bulk: 7,
  },
  paymentMethod: null,
  paymentSubOption: null,
  upiId: "",
  cardDetails: initialCardDetails,
  doorStatus: "closed",
  isAdActive: true, // starts with fullscreen advertisement
  adIndex: 0,

  setScreen: (screen) => set({ currentScreen: screen }),
  setAdActive: (active) => set({ isAdActive: active }),
  setAdIndex: (idx) => set({ adIndex: idx }),

  addTrayToCart: (id) => set((state) => {
    // If already in cart, do nothing, else add with quantity 1
    const exists = state.cart.find((item) => item.id === id);
    if (exists) return {};
    
    // Check stock
    if (state.stock[id] < 1) return {};
    
    return {
      cart: [...state.cart, { id, quantity: 1 }],
    };
  }),

  removeTrayFromCart: (id) => set((state) => ({
    cart: state.cart.filter((item) => item.id !== id),
  })),

  updateQuantity: (id, qty) => {
    const state = get();
    const stockLimit = state.stock[id];
    
    if (qty < 0) return { success: false, message: "Quantity cannot go below zero" };
    if (qty > stockLimit) {
      const name = id === "mini" ? "Mini" : id === "medium" ? "Medium" : "Bulk";
      return { 
        success: false, 
        message: `Only ${stockLimit} ${name} Trays Available` 
      };
    }

    set((state) => {
      // If quantity is 0, keep it in cart but with 0 (or remove it? 
      // wait, screen 3B allows showing (-) 0 (+), so we should keep it in cart or remove depending on tray state.
      // Wait, screen 3B quantity selector has minus/plus. If quantity becomes 0, 
      // it can be kept or removed. Let's update the quantity.
      const exists = state.cart.find((item) => item.id === id);
      let newCart = [...state.cart];
      
      if (exists) {
        newCart = state.cart.map((item) => 
          item.id === id ? { ...item, quantity: qty } : item
        );
      } else if (qty > 0) {
        newCart.push({ id, quantity: qty });
      }
      
      return { cart: newCart };
    });
    
    return { success: true };
  },

  setPaymentMethod: (method) => set({ paymentMethod: method, paymentSubOption: null }),
  setPaymentSubOption: (option) => set({ paymentSubOption: option }),
  setUpiId: (id) => set({ upiId: id }),
  setCardDetails: (details) => set((state) => ({
    cardDetails: { ...state.cardDetails, ...details },
  })),

  setDoorStatus: (status) => set({ doorStatus: status }),

  resetCart: () => set({ cart: [] }),
  
  resetAll: () => set({
    currentScreen: 1,
    cart: [],
    stock: {
      mini: 40,
      medium: 40,
      bulk: 7,
    },
    paymentMethod: null,
    paymentSubOption: null,
    upiId: "",
    cardDetails: initialCardDetails,
    doorStatus: "closed",
    isAdActive: false, // Don't immediately re-launch the launch ad (or depends on specs: returning to screen 1 restarts the same ad cycle, which starts with isAdActive: true or scheduling).
  }),
}));
