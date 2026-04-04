"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, CartState } from "@/types/cart";

function generateCartItemId(item: Omit<CartItem, "id">): string {
  const customizationKey = item.customizations
    ? JSON.stringify(
        Object.entries(item.customizations).sort(([a], [b]) =>
          a.localeCompare(b)
        )
      )
    : "";
  return `${item.productId}-${item.variantId || "default"}-${customizationKey}`;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (newItem) => {
        const id = generateCartItemId(newItem);
        set((state) => {
          const existingIndex = state.items.findIndex((item) => item.id === id);

          if (existingIndex >= 0) {
            const updatedItems = [...state.items];
            updatedItems[existingIndex] = {
              ...updatedItems[existingIndex],
              quantity:
                updatedItems[existingIndex].quantity + newItem.quantity,
            };
            return { items: updatedItems };
          }

          return { items: [...state.items, { ...newItem, id }] };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      itemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),

      subtotal: () =>
        get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
    }),
    {
      name: "crafted-by-mama-cart",
    }
  )
);
