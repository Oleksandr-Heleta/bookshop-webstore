import qs from 'query-string';

import { Category } from '@/type';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

interface Query {
  publishingId?: string;
  ageGroupId?: string;
}

const getCategories = async (query: Query): Promise<Category[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      publishingId: query.publishingId,
      ageGroupId: query.ageGroupId,
    },
  });

  const res = await fetch(url);
  // console.log(res);
  return res.json();
};

export default getCategories;
