'use client';

import { ShoppingCart } from 'lucide-react';

import useCart from '@/hooks/use-cart';
import { Product } from '@/type';

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
    <section>
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
        {children}
        <section className="flex flex-col  gap-x-4">
          <h3 className="font-semibold text-amber-950">Опис:</h3>
          <p>{data?.description}</p>
        </section>
        {/* <div className='mt-10 flex items-center gap-x-3'>
            <Button onClick={addToCart} className='flex items-center gap-x-2'>
                Купити
                <ShoppingCart size={20} className='ml-2'/>
            </Button>
        </div> */}
      </div>
    </section>
  );
};

export default Info;
