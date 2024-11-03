import qs from 'query-string';

import { AgeGroup } from '@/type';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/age-groups`;

export const getAgeGroup = async (id: string): Promise<AgeGroup> => {
  const res = await fetch(`${URL}/${id}`);

  return res.json();
};

interface Query {
  categoryId?: string;
  publishingId?: string;
}

const getAgeGroups = async (query: Query): Promise<AgeGroup[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      categoryId: query.categoryId,
      publishingId: query.publishingId,
    },
  });

  const res = await fetch(url);

  return res.json();
};

export default getAgeGroups;
