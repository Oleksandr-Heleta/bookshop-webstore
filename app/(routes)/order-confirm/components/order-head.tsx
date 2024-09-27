'use client';

import Contacts from '@/components/ui/contacts';
import useCart from '@/hooks/use-cart';
import { Order } from '@/type';

interface OrderHeadProps {
  order: Order;
}

const OrderHead = ({ order }: OrderHeadProps) => {
  const removeAll = useCart((state) => state.removeAll);

  //   console.log(order);

  if (order) {
    if (order.orderStatus === 'paid' || order.orderState !== 'online') {
      removeAll();
    }
    return (
      <>
        <h1 className="text-3xl font-bold text-amber-950">
          Ваше замовлення прийнято
        </h1>
        {order.orderStatus === 'failed' && (
          <p className="font-semibold text-red-600 my-4">
            Оплата не пройшла, найближчим часом з Вами зв&apos;яжеться менеджер
          </p>
        )}
      </>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-red-600 mt-4">
        Ваше замовлення не прийнято
      </h1>
      <p className="font-semibold text-amber-950 my-4">
        Зв&apos;яжіться, будь-ласка, з менеджером
      </p>
      <Contacts />
    </>
  );
};

export default OrderHead;
