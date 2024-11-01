import qs from 'query-string';

import { Product } from '@/type';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  categoryId?: string;
  categories?: string[];
  ageGroups?: string[];
  publishings?: string[];
  ageGroupId?: string;
  publishingId?: string;
  seriaId?: string;
  isFeatured?: boolean;
  isSale?: boolean;
  isNew?: boolean;
  name?: string;
  maxPrice?: number;
  minPrice?: number;
}

const getProducts = async (query: Query): Promise<Product[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      categories: query.categories,
      ageGroups: query.ageGroups,
      publishings: query.publishings,
      publishingId: query.publishingId,
      ageGroupId: query.ageGroupId,
      categoryId: query.categoryId,
      seriaId: query.seriaId,
      isFeatured: query.isFeatured,
      isSale: query.isSale,
      isNew: query.isNew,
      name: query.name,
      maxPrice: query.maxPrice,
      minPrice: query.minPrice,
    },
  });

  console.log(url);
  const res = await fetch(url);
  const data = await res.json();
  return data.data;
};

export default getProducts;
