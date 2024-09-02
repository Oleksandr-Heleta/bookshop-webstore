'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import React from 'react';

import Button from '@/components/ui/button';
import { cn } from '@/lib/utils';

type PaginationProps = {
  total: number;
  currentPage: number;
  pageSize: number;
};

const Pagination: React.FC<PaginationProps> = ({
  total,
  currentPage,
  pageSize,
}) => {
  const totalPages = Math.ceil(total / pageSize);
  const searchParams = useSearchParams();
  const router = useRouter();

  if (totalPages <= 1) return null;

  const onClick = (page: number) => {
    const current = qs.parse(searchParams.toString());
    const query = {
      ...current,
      page: page.toString(),
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  return (
    <div className="flex justify-center mt-8">
      <nav className="inline-flex">
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index}
            className={cn(
              'px-4 py-2 mx-1 border rounded',
              currentPage === index + 1
                ? 'bg-amber-950 text-white'
                : 'bg-white border-amber-800 text-amber-950'
            )}
            onClick={() => onClick(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
      </nav>
    </div>
  );
};

export default Pagination;
