import { toast } from 'react-hot-toast';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { OrderItem, Product } from '@/type';

interface CartStore {
  items: OrderItem[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
  chamgeQuantity: (id: string, quantity: number) => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) => item.productId === data.id
        );

        if (existingItem) {
          return toast('Товар вже є в кошику.');
        }

        set({
          items: [
            ...currentItems,
            { productId: data.id, quantity: 1, product: data },
          ],
        });
        toast.success('Товар додано в кошик.');
      },
      removeItem: (id: string) => {
        set({
          items: [...get().items.filter((item) => item.productId !== id)],
        });
        toast.success('Товар видалено з кошика.');
      },
      removeAll: () => set({ items: [] }),
      chamgeQuantity: (id: string, quantity: number) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.productId === id);

        if (!existingItem) {
          return toast('Товар не знайдено в кошику.');
        }

        if (quantity <= 0) {
          return toast('Кількість товару має бути більше 0.');
        }
        if (quantity > existingItem.product.quantity) {
          return toast('Обрана кількість товару відсутня.');
        }

        existingItem.quantity = quantity;
        set({ items: [...currentItems] });
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
