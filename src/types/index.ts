export type TrayType = "mini" | "medium" | "bulk";

export interface TrayInfo {
  id: TrayType;
  name: string;
  description: string;
  pricePerEgg: number;
  basePrice: number; // e.g. 36, 66, 150
  stock: number;
  image: string;
  eggCount: number;
}

export interface CartItem {
  id: TrayType;
  quantity: number;
}

export type PaymentMethod = "upi" | "card" | "wallet" | "netbanking";

export type DoorStatus = "closed" | "opening" | "open" | "closing" | "closed-success";

export interface CardDetails {
  cardNumber: string;
  expiry: string;
  cvv: string;
  cardHolder: string;
}
