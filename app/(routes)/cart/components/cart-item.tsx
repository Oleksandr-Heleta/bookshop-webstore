"use client";

import Image from 'next/image';
import {toast} from "react-hot-toast";
import {X, Minus, Plus} from "lucide-react";

import IconButton from '@/components/ui/icon-button';
import Currency from '@/components/ui/currency';
import useCart from '@/hooks/use-cart';
import {Product, ProdAgeGroup} from "@/type";
import { useState } from 'react';
import ChechSale from '@/components/ui/check-sale';

interface CartItemProps {
    data: Product;
};

const CartItem: React.FC<CartItemProps> = ({data}) => {
const [quantity, setQuantity ] = useState(1);
    const cart = useCart();
    const onRemove = ()=>{
        cart.removeItem(data.id);
       
    }
    const onChamgeQuantity = (quantity: number) => {
        
        if(quantity <= 0) {
            return toast("Кількість товару має бути більше 0.");
        }
        if(quantity > data.quantity) {
            return toast("Обрана кількість товару відсутня.");
        }
        setQuantity(quantity);
        cart.chamgeQuantity(data.id, quantity);
    }
    // console.log(data);    
    return (
        <li className='flex py-6 border-b'>
            <div className='relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48'>
                <Image
                    fill
                    src={data.images[0].url}
                    alt=''
                    className='object-cover object-center'
                />
            </div>
            <div className='relative ml-4 flex flex-1 flex-col justify-between sm:ml-6'>
                <div className='absolute z-10 right-0 top-0'>
                    <IconButton onClick={onRemove} icon={<X size={15} />} />
                </div>
                <div className='relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 '>
                    <div className='flex justify-between'>
                        <p className='text-lg font-semibold text-black'>
                            {data.name}
                        </p>
                       
                    </div>
                    <p className='justify-self-end'><ChechSale sail={data.isSale} percent={data.sale} price={data.price}/></p>
                    {/* <div className='mt-1 flex text-sm'>
                        <p className='text-gray-500'>{data?.ageGroups?.map((age:ProdAgeGroup) => (<span className='p-2' key={age.ageGroupId}>{age.ageGroupName}</span>) )}</p>
                        <p className='text-gray-500 ml-4 border-l border-gray-200 pl-4'>{data.publishing.name}</p>
                    </div> */}
                    

                </div>
                <div className='mt-6 flex items-center justify-between'>
                    <div className='flex items-center'>
                        <IconButton onClick={() => onChamgeQuantity(quantity - 1)} icon={<Minus size={15} />} />
                        <p className='mx-2  text-lg font-semibold text-black'>{quantity}</p>
                        <IconButton onClick={() => onChamgeQuantity(quantity + 1)} icon={<Plus size={15} />} />
                    </div>
                    <ChechSale sail={data.isSale} percent={data.sale} price={data.price*quantity}/>
                </div>
            </div>
        </li>
    );
};

export default CartItem;