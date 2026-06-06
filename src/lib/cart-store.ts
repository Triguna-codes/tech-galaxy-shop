import { create } from "zustand";
import type { Product } from "./products";

export interface CartItem {
  product: Product;
  qty: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  add: (p: Product) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  subtotal: () => number;
  count: () => number;
}

export const useCart = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((s) => ({ isOpen: !s.isOpen })),
  add: (p) =>
    set((s) => {
      const existing = s.items.find((i) => i.product.id === p.id);
      if (existing) {
        return {
          items: s.items.map((i) =>
            i.product.id === p.id ? { ...i, qty: i.qty + 1 } : i,
          ),
          isOpen: true,
        };
      }
      return { items: [...s.items, { product: p, qty: 1 }], isOpen: true };
    }),
  remove: (id) => set((s) => ({ items: s.items.filter((i) => i.product.id !== id) })),
  setQty: (id, qty) =>
    set((s) => ({
      items:
        qty <= 0
          ? s.items.filter((i) => i.product.id !== id)
          : s.items.map((i) => (i.product.id === id ? { ...i, qty } : i)),
    })),
  clear: () => set({ items: [] }),
  subtotal: () => get().items.reduce((sum, i) => sum + i.product.price * i.qty, 0),
  count: () => get().items.reduce((sum, i) => sum + i.qty, 0),
}));
