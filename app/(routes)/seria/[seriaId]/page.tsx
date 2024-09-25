import { Metadata, ResolvingMetadata } from 'next';

import getProducts from '@/actions/get-products';
import { getSeria } from '@/actions/get-seria';
import Container from '@/components/ui/container';
import NoResults from '@/components/ui/no-results';
import ProductCard from '@/components/ui/product-card';

export const revalidate = 0;

interface SeriaPageProps {
  params: {
    seriaId: string;
  };
}

export async function generateMetadata(
  { params }: SeriaPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // console.log(params);
  const seria = await getSeria(params.seriaId);

  const parentMetadata = await parent;
  const previousImages = parentMetadata.openGraph?.images || [];
  const previousKeywords = parentMetadata.keywords || [];
  const previosDescription = parentMetadata.description || '';

  return {
    title:
      seria.titleSeo ??
      ` Купити книги серії ${seria.name}| Магазин дитячих книг МИШКА`,
    description: seria.descriptionSeo ?? previosDescription,
    keywords: [
      `${seria.name}`,
      `книги ${seria.name}`,
      `книжки ${seria.name}`,
      `дитячі книжки ${seria.name}`,
      ...previousKeywords,
    ],
    openGraph: {
      images: [...previousImages],
      title: ` Купити книги серії ${seria.name}| Магазин дитячих книг МИШКА`,
    },
  };
}

const CategoryPage: React.FC<SeriaPageProps> = async ({ params }) => {
  const seria = await getSeria(params.seriaId);
  const products = await getProducts({
    seriaId: params.seriaId,
  });

  // console.log(products);

  return (
    <div className="bg-white">
      <Container>
        <article className="px-4 sm:px-6 lg:px-8 pb-24 pt-4">
          <div className="lg:grid lg:grid-cols-4 lg:gap-x-8">
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              <h1 className="font-bold text-3xl text-amber-950 mb-6">
                Книги серії {seria.name}
              </h1>
              {products.length === 0 && <NoResults />}
              <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {products.map((product) => (
                  <li key={product.id} className="flex">
                    <ProductCard data={product} />
                  </li>
                ))}
              </ul>
              {seria.description && <p>{seria.description}</p>}
            </div>
          </div>
        </article>
      </Container>
    </div>
  );
};

export default CategoryPage;
