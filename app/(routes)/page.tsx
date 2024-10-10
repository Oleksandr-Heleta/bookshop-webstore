import { MoveRight } from 'lucide-react';
import { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';

import getProducts from '@/actions/get-products';
import getStoreInfo from '@/actions/get-storeinfo';
import MainSlider from '@/components/main-slider';
import ProductList from '@/components/product-list';
import Container from '@/components/ui/container';

export const revalidate = 0;

interface SeriaPageProps {
  params: {
    page?: string;
  };
}

export async function generateMetadata(
  { params }: SeriaPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // console.log(params);
  const storeinfo = await getStoreInfo();

  const parentMetadata = await parent;
  const previousImages = parentMetadata.openGraph?.images || [];
  const previousKeywords = parentMetadata.keywords || [];
  const previosDescription = parentMetadata.description || '';

  return {
    title:
      storeinfo.titleSeo ??
      'Магазин дитячих книг МИШКА | Купити дитячі книги онлайн',
    description: storeinfo.descriptionSeo ?? previosDescription,
    keywords: [...previousKeywords],
    openGraph: {
      images: [...previousImages],
      title: 'Магазин дитячих книг МИШКА | Купити дитячі книги онлайн',
    },
  };
}

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
  const storeinfo = await getStoreInfo();
  // const billboard = await getBillboard('cf4c6ea7-2b8d-46f8-95b4-9ada229145b9');
  // console.log(storeinfo);

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <MainSlider slides={storeinfo.mainbillboards} />

        {newProducts.length !== 0 && (
          <div className="relative flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
            <Link
              href="/new"
              className="absolute top-2 right-8 flex gap-2 amber-950 hover:amber-800 hover:scale-105  transition"
            >
              <MoveRight />
              Всі новинки
            </Link>
            <ProductList title="Новинки" items={newProducts} />
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
        {storeinfo.description && (
          <div className="px-4 sm:px-6 lg:px-8">
            <div
              className="mt-12 text-justify"
              dangerouslySetInnerHTML={{ __html: storeinfo.description }}
            />
          </div>
        )}
      </div>
    </Container>
  );
};

export default HomePage;
