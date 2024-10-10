'use client';

import React from 'react';

import Container from '@/components/ui/container';
import NoResults from '@/components/ui/no-results';
import Pagination from '@/components/ui/pagination';
import ProductCard from '@/components/ui/product-card';

import Filter from './filter';
import MobileFilters from './mobile-filters';

interface ProductListPageProps {
  title: string;
  description?: string;
  products: any[];
  filters: {
    ageGroups?: any[];
    categories?: any[];
    publishings?: any[];
  };
  currentPage: number;
  pageSize: number;
}

const ProductListPage: React.FC<ProductListPageProps> = ({
  title,
  description,
  products,
  filters,
  currentPage,
  pageSize,
}) => {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedProducts = products.slice(startIndex, endIndex);

  return (
    <div className="bg-white">
      <Container>
        <article className="px-4 sm:px-6 lg:px-8 pb-24 pt-4">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <MobileFilters {...filters} />
            <div className="hidden lg:block">
              {filters.categories && (
                <Filter
                  valueKey="categoryId"
                  name="Категорії"
                  data={filters.categories}
                />
              )}
              {filters.ageGroups && (
                <Filter
                  valueKey="ageGroupId"
                  name="Вік"
                  data={filters.ageGroups}
                />
              )}
              {filters.publishings && (
                <Filter
                  valueKey="publishingId"
                  name="Видавництво"
                  data={filters.publishings}
                />
              )}
            </div>
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              <h1 className="font-bold text-3xl text-amber-950 mb-6">
                {title}
              </h1>
              {paginatedProducts.length === 0 && <NoResults />}
              <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {paginatedProducts.map((product) => (
                  <li key={product.id} className="flex">
                    <ProductCard data={product} />
                  </li>
                ))}
              </ul>
              {products.length >= pageSize && (
                <Pagination
                  total={products.length}
                  currentPage={currentPage}
                  pageSize={pageSize}
                />
              )}
            </div>
          </div>
          {description && (
            <div
              className="mt-12 text-justify"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </article>
      </Container>
    </div>
  );
};

export default ProductListPage;
