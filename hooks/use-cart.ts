import {create} from "zustand";
import {persist, createJSONStorage} from "zustand/middleware";
import {Product} from "@/type";
import {toast} from "react-hot-toast";

interface CartStore {
    items: Product[];
    addItem: (data:Product) => void;
    removeItem: (id:string)=> void;
    removeAll: ()=> void;
};

const useCart = create(
    persist<CartStore>((set , get) => ({
        items: [],
        addItem: (data:Product) => {
            const currentItems = get().items;
            const existingItem = currentItems.find((item) => item.id === data.id);

            if(existingItem) {
                return toast("Товар вже є в кошику.");
            }

            set({items: [...currentItems, data]});
            toast.success("Товар додано в кошик.");
        },
        removeItem: (id: string) => {
            set({items: [...get().items.filter((item) => item.id !== id)]});
            toast.success("Товар видалено з кошика.");
        },
        removeAll: () => set({items: []}),
    }),{
        name: "cart-storage",
        storage: createJSONStorage(()=> localStorage)
    })
)

export default useCart;
