"use client"

import { Product } from "@/type";
import Currency from "@/components/ui/currency";
import Button from "./ui/button";
import { ShoppingCart } from "lucide-react";
import useCart from "@/hooks/use-cart";
interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();

  const addToCart = () => {
    cart.addItem(data);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900">
          <Currency value={data?.price} />
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Size:</h3>
          <div>{data?.size?.value}</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Collor:</h3>
          <div
            className="w-8 h-8 rounded-full border border-gray-600"
            style={{ backgroundColor: data?.collor?.value }}
          ></div>
        </div>
        <div className="mt-10 flex items-center gap-x-3">
            <Button onClick={addToCart} className="flex items-center gap-x-2">
                Купити
                <ShoppingCart size={20} className="ml-2"/>
            </Button>
        </div>
      </div>
    </div>
  );
};

export default Info;
