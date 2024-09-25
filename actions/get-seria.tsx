import { Seria } from '@/type';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/serias`;

export const getSeria = async (id: string): Promise<Seria> => {
  const res = await fetch(`${URL}/${id}`);

  return res.json();
};

const getSerias = async (): Promise<Seria[]> => {
  const res = await fetch(URL);

  return res.json();
};

export default getSerias;
