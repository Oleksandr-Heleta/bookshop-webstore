'use client';

import React from 'react';

import { useFilters } from '@/hooks/use-filters';
import { useQueryFilters } from '@/hooks/use-query-filters';

import { CheckboxFiltersGroup } from './ui/checkbox-filters-group';
import Input from './ui/input';
import { RangeSlider } from './ui/range-slider';

interface Props {
  className?: string;
  filtersData: {
    ageGroups?: any[];
    categories?: any[];
    publishings?: any[];
  };
}

export const Filters: React.FC<Props> = ({ className, filtersData }) => {
  const filters = useFilters();

  useQueryFilters(filters);

  const updatePrices = (prices: number[]) => {
    // console.log(prices);
    filters.setPrices('priceFrom', prices[0]);
    filters.setPrices('priceTo', prices[1]);
  };

  return (
    <div className={className}>
      <h3 className="font-bold mb-5  ">Фільтр</h3>

      {filtersData.categories && (
        <CheckboxFiltersGroup
          title="Категорії"
          name="categories"
          className="mb-5"
          onClickCheckbox={filters.setCategories}
          selected={filters.categories}
          items={filtersData.categories.map((item) => ({
            text: item.name,
            value: item.id,
          }))}
        />
      )}

      {filtersData.ageGroups && (
        <CheckboxFiltersGroup
          title="Вік"
          name="ageGroups"
          className="mb-5"
          onClickCheckbox={filters.setAgeGroups}
          selected={filters.ageGroups}
          items={filtersData.ageGroups.map((item) => ({
            text: item.name,
            value: item.id,
          }))}
        />
      )}

      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Ціна від і до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            value={String(filters.prices.priceFrom)}
            onChange={(e) =>
              filters.setPrices('priceFrom', Number(e.target.value))
            }
          />
          <Input
            type="number"
            min={100}
            max={1000}
            placeholder="1000"
            value={String(filters.prices.priceTo)}
            onChange={(e) =>
              filters.setPrices('priceTo', Number(e.target.value))
            }
          />
        </div>

        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[
            filters.prices.priceFrom || 0,
            filters.prices.priceTo || 1000,
          ]}
          onValueChange={updatePrices}
        />
      </div>

      {filtersData.publishings && (
        <CheckboxFiltersGroup
          title="Видавництво"
          name="publishings"
          className="mb-5"
          onClickCheckbox={filters.setPublishings}
          selected={filters.publishings}
          items={filtersData.publishings.map((item) => ({
            text: item.name,
            value: item.id,
          }))}
        />
      )}
    </div>
  );
};
