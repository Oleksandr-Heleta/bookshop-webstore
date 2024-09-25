import Image from 'next/image';
import Link from 'next/link';

import getOrder from '@/actions/get-order';

interface SearchParams {
  orderId?: string;
}

const OrderConfirmPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const orderId = searchParams.orderId || '';
  console.log(orderId);
  const order = await getOrder(orderId);
  console.log(order);
  return (
    <section className="mx-auto mt-4">
      <h1 className="text-3xl font-bold text-amber-950">
        Ваше замовлення прийнято
      </h1>
      <p>Номер замовлення: {order.id}</p>
      <p>Ваше замовлення:</p>
      <ul>
        {order.orderItems.map(({ product, quantity }) => (
          <li key={product.id} className="flex">
            <div className="relative h-24 w-24">
              <Image
                fill
                src={product.images[0].url}
                alt=""
                className="object-contain object-center"
              />
            </div>
            <p>
              {product.name} - {quantity} шт.
            </p>
          </li>
        ))}
      </ul>
      <p>На загальну суму: {order.totalPrice} грн.</p>
      <Link href="/">На головну</Link>
    </section>
  );
};

export default OrderConfirmPage;
