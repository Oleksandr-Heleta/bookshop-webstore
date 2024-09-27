import Image from 'next/image';
import Link from 'next/link';

import getOrder from '@/actions/get-order';
import Container from '@/components/ui/container';

import IBANpayment from './components/iban-payment';
import OrderHead from './components/order-head';

interface SearchParams {
  orderId?: string;
}

const OrderConfirmPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const orderId = searchParams.orderId || '';
  // console.log(orderId);
  const order = await getOrder(orderId);
  // console.log(!!order);

  return (
    <Container>
      <section className="lg:flex gap-4 px-4 py-16 sm:px-6 lg:px-8">
        <div className="grow text-sm sm:text-lg ">
          <OrderHead order={order} />
          {order && (
            <div className="mt-12 amder-800 text-sm sm:text-lg">
              <div className="flex gap-2 mt-2">
                <p className="font-semibold text-amber-950  ">
                  Номер замовлення:
                </p>
                <p> {order.id}</p>
              </div>
              <h3 className="font-semibold text-amber-950 mt-2">
                Ваше замовлення:
              </h3>
              <ul>
                {order.orderItems.map(({ product, quantity }) => (
                  <li key={product.id} className="flex gap-2 mt-2 px-2">
                    <div className="relative h-16 w-16 rounded-md overflow-hidden ">
                      <Image
                        fill
                        src={product.images[0].url}
                        alt=""
                        className="object-contain object-center"
                      />
                    </div>
                    <p className="text-sm sm:text-lg font-semibold text-amber-950">
                      {product.name} - {quantity} шт.
                    </p>
                  </li>
                ))}
              </ul>
              <div className="flex gap-2 mt-2">
                <p className="font-semibold text-amber-950">
                  На загальну суму:{' '}
                </p>
                <p> {order.totalPrice} грн.</p>
              </div>
            </div>
          )}
        </div>
        {order && order.orderState == 'byIBAN' && <IBANpayment order={order} />}
      </section>
      <div
        className="mx-auto my-4 w-32 px-3 py-1 border border-amber-950 bg-amber-200 rounded-full  hover:opacity-75 
        transition"
      >
        <Link href="/" className="text-amber-950">
          На головну
        </Link>
      </div>
    </Container>
  );
};

export default OrderConfirmPage;
