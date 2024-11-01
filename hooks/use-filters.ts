import { useSearchParams } from 'next/navigation';
import React from 'react';
import { useSet } from 'react-use';

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryFilters extends PriceProps {
  categories: string;
  ageGroups: string;
  publishings: string;
}

export interface Filters {
  ageGroups: Set<string>;
  categories: Set<string>;
  publishings: Set<string>;
  prices: PriceProps;
}

interface ReturnProps extends Filters {
  setPrices: (name: keyof PriceProps, value: number) => void;
  setCategories: (value: string) => void;
  setAgeGroups: (value: string) => void;
  setPublishings: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >;

  const [publishings, { toggle: togglePublishings }] = useSet(
    new Set<string>(searchParams.get('publishings')?.split(','))
  );

  const [ageGroups, { toggle: toggleAgeGroups }] = useSet(
    new Set<string>(
      searchParams.has('ageGroups')
        ? searchParams.get('ageGroups')?.split(',')
        : []
    )
  );

  const [categories, { toggle: toggleCategories }] = useSet(
    new Set<string>(
      searchParams.has('categories')
        ? searchParams.get('categories')?.split(',')
        : []
    )
  );

  const [prices, setPrices] = React.useState<PriceProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined,
  });

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrices((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return React.useMemo(
    () => ({
      ageGroups,
      categories,
      publishings,
      prices,
      setPrices: updatePrice,
      setCategories: toggleCategories,
      setAgeGroups: toggleAgeGroups,
      setPublishings: togglePublishings,
    }),
    [ageGroups, categories, publishings, prices]
  );
};
