import { SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

// import { useState } from 'react';
import getProducts from '@/actions/get-products';
import { cn } from '@/lib/utils';
import Select from './select';

interface Item {
  id: string;
  name: string;
}

interface SearchProps {
  onClose?: () => void;
  autoFocus?: boolean;
  className?: string;
}

const Search: React.FC<SearchProps> = ({ autoFocus, className, onClose }) => {
  const router = useRouter();
  // const [query, setQuery] = useState('');

  const getProduct = async (query: string) => {
    const response = await getProducts({ name: query });
    return response.map((product) => ({ name: product.name, id: product.id }));
  };

  const handleProduct = (item: Item | null) => {
    if (item) {
      router.push(`/product/${item.id}`);
      onClose && onClose();
    }
    //
  };

  return (
    <div className={cn(`relative`, className)}>
      <Select
        getFn={getProduct}
        onItemSelect={handleProduct}
        autoFocus={autoFocus}
      />
      <SearchIcon
        size={20}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 bg-white"
      />
    </div>
  );
};

export default Search;
