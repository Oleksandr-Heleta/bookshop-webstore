'use client';
import { Expand, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MouseEventHandler } from 'react';
import React, { useEffect, useRef, useState } from 'react';

// import Currency from '@/components/ui/currency';
import IconButton from '@/components/ui/icon-button';
import useCart from '@/hooks/use-cart';
import useImageModal from '@/hooks/use-image-modal';
import usePreviewModal from '@/hooks/use-preview-modal';
import { Product } from '@/type';

import CheckSale from './check-sale';

interface ProductCardProps {
  data: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const cart = useCart();
  const previewModal = usePreviewModal();
  const imageModal = useImageModal();
  const router = useRouter();
  const handleClick = () => {
    router.push(`/product/${data.id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    previewModal.onOpen(data);
  };

  const onZoom: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    imageModal.onOpen(data.images);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(data);
  };

  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting && entry.intersectionRatio === 1);
      },
      {
        root: null,
        threshold: 1, // 50% of the element should be visible
      }
    );

    const currentCardRef = cardRef.current;

    if (currentCardRef) {
      observer.observe(currentCardRef);
    }

    return () => {
      if (currentCardRef) {
        observer.unobserve(currentCardRef);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="bg-white group  rounded-xl border border-amber-800 p-3 space-y-4"
    >
      <div
        onClick={handleClick}
        className="cursor-pointer aspect-square rounded-xl  relative"
      >
        <div className="absolute top-10 left-0 z-10 flex flex-col gap-2">
          {data.isNew && (
            <div className=" bg-red-600 text-white rounded-lg p-1 tracking-wider text-xs font-semibold">
              Новинка
            </div>
          )}
          {data.isSale && (
            <div className=" bg-orange-500 text-white text-center rounded-lg p-1 text-xs font-semibold">
              - {data.sale} %
            </div>
          )}
        </div>
        <Image
          src={data?.images?.[0]?.url}
          fill
          alt="Image"
          className="aspect-square object-contain rounded-md"
        />
        <div
          className={`opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition absolute w-full px-6 bottom-5 ${
            isVisible ? 'mobile-visible' : ''
          }`}
        >
          <div className="flex gap-x-6 justify-center">
            <IconButton
              onClick={onPreview}
              className="hidden lg:block"
              icon={
                <Expand
                  size={20}
                  className="text-white bg-inherit hidden lg:block"
                />
              }
            />
            <IconButton
              onClick={onZoom}
              className="lg:hidden"
              icon={
                <Expand size={20} className="text-white bg-inherit lg:hidden" />
              }
            />
            <IconButton
              onClick={onAddToCart}
              icon={
                <ShoppingCart size={20} className="text-white bg-inherit" />
              }
            />
          </div>
        </div>
      </div>
      <div>
        <p
          onClick={handleClick}
          className="cursor-pointer font-semibold text-lg text-amber-950 hover:scale-105 origin-left transition"
        >
          {data.name}
        </p>
      </div>
      <div className="flex item-center justify-between">
        <CheckSale
          isSale={data.isSale}
          percent={data.sale}
          price={data.price}
        />
      </div>
    </div>
  );
};

export default ProductCard;
