import { TrayInfo } from "../types";

export const EGG_TRAYS: TrayInfo[] = [
  {
    id: "mini",
    name: "Mini Egg Tray",
    description: "6 Fresh Eggs . ₹6/Egg",
    pricePerEgg: 6,
    basePrice: 36,
    stock: 40,
    image: "/images/page_3_img_1.png",
    eggCount: 6,
  },
  {
    id: "medium",
    name: "Medium Egg Tray",
    description: "12 Fresh Eggs . ₹5.5/Egg",
    pricePerEgg: 5.5,
    basePrice: 66,
    stock: 40,
    image: "/images/page_3_img_2.png",
    eggCount: 12,
  },
  {
    id: "bulk",
    name: "Bulk Egg Tray",
    description: "30 Fresh Eggs . ₹5/Egg",
    pricePerEgg: 5,
    basePrice: 150,
    stock: 7,
    image: "/images/page_3_img_3.png",
    eggCount: 30,
  }
];
