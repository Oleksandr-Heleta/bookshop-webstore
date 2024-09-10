import { Order } from '@/type';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/orders`;

const getOrder = async (id: string): Promise<Order> => {
  const res = await fetch(`${URL}/${id}`);
  const data = await res.json();
  return data.order;
};

export default getOrder;
