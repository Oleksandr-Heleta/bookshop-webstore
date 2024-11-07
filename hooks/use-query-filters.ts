import { useRouter } from 'next/navigation';
import qs from 'qs';
import React from 'react';

import { Filters } from './use-filters';

export const useQueryFilters = (filters: Filters) => {
  const isMounted = React.useRef(false);
  const router = useRouter();

  React.useEffect(() => {
    if (isMounted.current) {
      const params = {
        ...filters.prices,
        categories: Array.from(filters.categories),
        ageGroups: Array.from(filters.ageGroups),
        publishings: Array.from(filters.publishings),
      };

      const query = qs.stringify(params, {
        arrayFormat: 'comma',
      });

      router.push(`?${query}`, {
        scroll: false,
      });

      // console.log(filters);
    }

    isMounted.current = true;
  }, [filters]);
};