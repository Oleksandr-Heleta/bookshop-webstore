"use client";

import { ProdCategory, ProdAgeGroup, Product } from "@/type";
import Currency from "@/components/ui/currency";
import Button from "./ui/button";
import { ShoppingCart } from "lucide-react";
import useCart from "@/hooks/use-cart";
import ChechSale from "./ui/check-sale";

interface InfoProps {
  data: Product;
  children?: React.ReactNode;
}

const Info: React.FC<InfoProps> = ({ data, children }) => {
  const cart = useCart();

  const addToCart = () => {
    cart.addItem(data);
  };

  const title = data.titleSheet == "Solid" ? "Тверда" : "М'яка";
  // console.log(data);
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <div className="text-2xl text-gray-900">
        <ChechSale sail={data.isSale} percent={data.sale} price={data.price}/>
        </div>
        <Button onClick={addToCart} className="flex items-center gap-x-2">
          Купити
          <ShoppingCart size={20} className="ml-2" />
        </Button>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Категорії:</h3>
          {data?.categories?.map((category: ProdCategory) => (
            <div key={category.categoryId}>{category.categoryName}</div>
          ))}
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Вік:</h3>
          {data?.ageGroups?.map((age: ProdAgeGroup) => (
            <div key={age.ageGroupId}>{age.ageGroupName}</div>
          ))}
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Видавництво:</h3>
          <div>{data?.publishing?.name}</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Обкладинка:</h3>
          <div>{title}</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Кількість сторінок:</h3>
          <div>{data?.sheets}</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Розмір:</h3>
          <div>{data?.size}</div>
        </div>
        {/* <div className="mt-10 flex items-center gap-x-3">
            <Button onClick={addToCart} className="flex items-center gap-x-2">
                Купити
                <ShoppingCart size={20} className="ml-2"/>
            </Button>
        </div> */}
        {children}
      </div>
    </div>
  );
};

export default Info;
