import { Metadata, ResolvingMetadata } from 'next';

import getAgeGroups from '@/actions/get-age-groups';
import getCategories from '@/actions/get-categories';
import getProducts from '@/actions/get-products';
import getPublishings from '@/actions/get-publishing';
import Container from '@/components/ui/container';
import NoResults from '@/components/ui/no-results';
import Pagination from '@/components/ui/pagination';
import ProductCard from '@/components/ui/product-card';

import Filter from './components/filter';
import MobileFilters from './components/mobile-filters';

export const revalidate = 0;

interface SalePageProps {
  searchParams: {
    publishingId: string;
    ageGroupId: string;
    categoryId: string;
    page?: string;
  };
}

export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  // console.log(params);

  const parentMetadata = await parent;
  const previousImages = parentMetadata.openGraph?.images || [];
  const previousKeywords = parentMetadata.keywords || [];

  return {
    title: `Нові книги| Магазин дитячих книг МИШКА`,
    keywords: [
      `купити нові книги`,
      `книги новинки`,
      `книжки нові`,
      `дитячі книжки новинки`,
      ...previousKeywords,
    ],
    openGraph: {
      images: [...previousImages],
      title: `Нові надходження книг| Магазин дитячих книг МИШКА`,
    },
  };
}

const SalePage: React.FC<SalePageProps> = async ({ searchParams }) => {
  const pageSize = 20;
  const currentPage = parseInt(searchParams.page || '1', 10);

  const products = await getProducts({
    isNew: true,
    publishingId: searchParams.publishingId,
    categoryId: searchParams.categoryId,
    ageGroupId: searchParams.ageGroupId,
  });

  const ageGroups = await getAgeGroups();
  const categories = await getCategories();
  const publishings = await getPublishings();

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedProducts = products.slice(startIndex, endIndex);

  return (
    <div className="bg-white">
      <Container>
        <article className="px-4 sm:px-6 lg:px-8 pb-24 pt-4">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <MobileFilters
              ageGroups={ageGroups}
              categories={categories}
              publishings={publishings}
            />
            <div className="hidden lg:block">
              <Filter
                valueKey="categoryId"
                name="Категорії"
                data={categories}
              />
              <Filter valueKey="ageGroupId" name="Вік" data={ageGroups} />
              <Filter
                valueKey="publishingId"
                name="Видавництво"
                data={publishings}
              />
            </div>

            <div className="mt-6 lg:col-span-4 lg:mt-0">
              <h1 className="font-bold text-3xl text-amber-950 mb-6">
                Нові надходження
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
        </article>
      </Container>
    </div>
  );
};

export default SalePage;
