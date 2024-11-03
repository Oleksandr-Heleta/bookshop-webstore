import qs from 'query-string';

import { Publishing } from '@/type';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/publishings`;

export const getPublishing = async (id: string): Promise<Publishing> => {
  const res = await fetch(`${URL}/${id}`);

  return res.json();
};

interface Query {
  categoryId?: string;
  ageGroupId?: string;
}

const getPublishings = async (query: Query): Promise<Publishing[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      categoryId: query.categoryId,
      ageGroupId: query.ageGroupId,
    },
  });
  const res = await fetch(url);

  return res.json();
};

export default getPublishings;
