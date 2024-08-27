'use client';

import { ShoppingCart } from 'lucide-react';

import useCart from '@/hooks/use-cart';
import { ProdAgeGroup, ProdCategory, Product } from '@/type';

import Button from './ui/button';
import ChechSale from './ui/check-sale';

interface InfoProps {
  data: Product;
  children?: React.ReactNode;
}

const Info: React.FC<InfoProps> = ({ data, children }) => {
  const cart = useCart();

  const addToCart = () => {
    cart.addItem(data);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-amber-950">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <div className="text-2xl text-amber-950">
          <ChechSale
            isSale={data.isSale}
            percent={data.sale}
            price={data.price}
          />
        </div>
        <Button onClick={addToCart} className="flex items-center gap-x-2">
          Купити
          <ShoppingCart size={20} className="ml-2" />
        </Button>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col  gap-y-2">
        <div className="flex items-center flex-wrap gap-x-2 sm:gap-x-4 sm:flex-nowrap">
          <h3 className="font-semibold text-amber-950">Категорії:</h3>
          {data?.categories?.map((category: ProdCategory) => (
            <div key={category.categoryId}>{category.categoryName}</div>
          ))}
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-amber-950">Вік:</h3>
          {data?.ageGroups?.map((age: ProdAgeGroup) => (
            <div key={age.ageGroupId}>{age.ageGroupName}</div>
          ))}
        </div>
        {/* <div className='flex items-center gap-x-4'>
          <h3 className='font-semibold text-amber-950'>Видавництво:</h3>
          <div>{data?.publishing?.name}</div>
        </div>
        <div className='flex items-center gap-x-4'>
          <h3 className='font-semibold text-amber-950'>Обкладинка:</h3>
          <div>{title}</div>
        </div>
        <div className='flex items-center gap-x-4'>
          <h3 className='font-semibold text-amber-950'>Кількість сторінок:</h3>
          <div>{data?.sheets}</div>
        </div>
        <div className='flex items-center gap-x-4'>
          <h3 className='font-semibold text-amber-950'>Розмір:</h3>
          <div>{data?.size}</div>
        </div> */}
        {children}
        <div className="flex flex-col  gap-x-4">
          <h3 className="font-semibold text-amber-950">Опис:</h3>
          <div>{data?.description}</div>
        </div>
        {/* <div className='mt-10 flex items-center gap-x-3'>
            <Button onClick={addToCart} className='flex items-center gap-x-2'>
                Купити
                <ShoppingCart size={20} className='ml-2'/>
            </Button>
        </div> */}
      </div>
    </div>
  );
};

export default Info;
