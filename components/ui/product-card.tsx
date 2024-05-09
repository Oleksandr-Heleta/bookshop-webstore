"use client";
import { Product } from "@/type";
import Image from "next/image";
import { useRouter } from "next/navigation";
import IconButton from "@/components/ui/icon-button";
import { Expand, ShoppingCart } from "lucide-react";
import Currency from "@/components/ui/currency";
import { MouseEventHandler } from "react";
import usePreviewModal from "@/hooks/use-preview-modal";
import useCart from "@/hooks/use-cart";
import ChechSale from "./check-sale";

interface ProductCardProps {
  data: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const cart = useCart();
  const previewModal = usePreviewModal();
  const router = useRouter();
  const handleClick = () => {
    router.push(`/product/${data.id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    previewModal.onOpen(data);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(data);
  };

  return (
    <div  className="bg-white group  rounded-xl border p-3 space-y-4" >
      <div onClick={handleClick} className="cursor-pointer aspect-square rounded-xl bg-gray-100 relative">
      <div className="absolute top-10 left-0 z-10 flex flex-col gap-2">
      {data.isNew && <div className=" bg-red-600 text-white rounded-lg p-1 tracking-wider text-xs font-semibold">
          Новинка
        </div>}
        {data.isSale && <div className=" bg-orange-500 text-white rounded-lg p-1 text-xs font-semibold"> 
          - {data.sale} %
        </div>}
      </div>
        <Image
          src={data?.images?.[0]?.url}
          fill
          alt="Image"
          className="aspect-square object-cover rounded-md"
        />
        <div className="opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton
              onClick={onPreview}
              icon={<Expand size={20} className="text-gray-600" />}
            />
            <IconButton
              onClick={onAddToCart}
              icon={<ShoppingCart size={20} className="text-gray-600" />}
            />
          </div>
        </div>
      </div>
      <div>
        <p onClick={handleClick} className="cursor-pointer font-semibold text-lg hover:scale-105 origin-left transition">{data.name}</p>
       
      </div>
      <div className="flex item-center justify-between">
        <ChechSale sail={data.isSale} percent={data.sale} price={data.price}/>
      
      </div>
    </div>
  );
};

export default ProductCard;
