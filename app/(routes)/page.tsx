import { MoveRight } from 'lucide-react';
import Link from 'next/link';

import getProducts from '@/actions/get-products';
import MainSlider from '@/components/main-slider';
import ProductList from '@/components/product-list';
import Container from '@/components/ui/container';

export const revalidate = 0;

const HomePage = async () => {
  const newProducts = await getProducts({
    isFeatured: true,
    isNew: true,
    isSale: false,
  });
  const saleProducts = await getProducts({ isFeatured: true, isSale: true });
  const featuredProducts = await getProducts({
    isFeatured: true,
    isSale: false,
    isNew: false,
  });
  // const billboard = await getBillboard('cf4c6ea7-2b8d-46f8-95b4-9ada229145b9');

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <MainSlider />

        {newProducts.length !== 0 && (
          <div className="relative flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
            <Link
              href="/new"
              className="absolute top-2 right-8 flex gap-2 amber-950 hover:amber-800 hover:scale-105  transition"
            >
              <MoveRight />
              Всі новинки
            </Link>
            <ProductList title="Нові надходження" items={newProducts} />
          </div>
        )}
        {saleProducts.length !== 0 && (
          <div className="relative flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
            <Link
              href="/sale"
              className="absolute top-2 right-8 flex gap-2 amber-950 hover:amber-800 hover:scale-105  transition"
            >
              <MoveRight />
              Всі акції
            </Link>
            <ProductList title="Акції" items={saleProducts} />
          </div>
        )}
        {featuredProducts.length !== 0 && (
          <div className=" flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
            <ProductList title="Рекомендації" items={featuredProducts} />
          </div>
        )}
      </div>
    </Container>
  );
};

export default HomePage;
