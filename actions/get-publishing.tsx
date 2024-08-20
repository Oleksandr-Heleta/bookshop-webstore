import { Publishing } from '@/type';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/publishings`;

export const getPublishing = async (id: string): Promise<Publishing> => {
  const res = await fetch(`${URL}/${id}`);

  return res.json();
};

const getPublishings = async (): Promise<Publishing[]> => {
  const res = await fetch(URL);

  return res.json();
};

export default getPublishings;
