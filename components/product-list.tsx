import NoResults from '@/components/ui/no-results';
import ProductCard from '@/components/ui/product-card';
import { Product } from '@/type';

interface ProductListProps {
  title: string;
  items: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ title, items }) => {
  return (
    <section className="space-y-4">
      <h3 className="font-bold text-3xl text-amber-950">{title}</h3>
      {items.length === 0 && <NoResults />}
      <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <li key={item.id} className="flex">
            <ProductCard data={item} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProductList;
