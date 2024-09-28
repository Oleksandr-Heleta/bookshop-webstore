import { Metadata, ResolvingMetadata } from 'next';

import getAgeGroups from '@/actions/get-age-groups';
import getCategories from '@/actions/get-categories';
import getProducts from '@/actions/get-products';
import { getPublishing } from '@/actions/get-publishing';
import Container from '@/components/ui/container';
import NoResults from '@/components/ui/no-results';
import Pagination from '@/components/ui/pagination';
import ProductCard from '@/components/ui/product-card';

import Filter from './components/filter';
import MobileFilters from './components/mobile-filters';

export const revalidate = 0;

interface PublishingPageProps {
  params: {
    publishingId: string;
  };
  searchParams: {
    ageGroupId: string;
    categoryId: string;
    page?: string;
  };
}

export async function generateMetadata(
  { params }: PublishingPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // console.log(params);
  const publishing = await getPublishing(params.publishingId);

  const parentMetadata = await parent;
  const previousImages = parentMetadata.openGraph?.images || [];
  const previousKeywords = parentMetadata.keywords || [];
  const previousDescription = parentMetadata.description || '';

  return {
    title:
      publishing.titleSeo ??
      `Купити книги видавництва ${publishing.name}| Магазин дитячих книг МИШКА`,
    description: publishing.descriptionSeo ?? previousDescription,
    keywords: [
      `${publishing.name}`,
      `книги ${publishing.name}`,
      `книжки ${publishing.name}`,
      `дитячі книжки ${publishing.name}`,
      ...previousKeywords,
    ],
    openGraph: {
      images: [...previousImages],
      title: `Купити книги видавництва ${publishing.name}| Магазин дитячих книг МИШКА`,
    },
  };
}

const CategoryPage: React.FC<PublishingPageProps> = async ({
  params,
  searchParams,
}) => {
  const pageSize = 20;
  const currentPage = parseInt(searchParams.page || '1', 10);

  const products = await getProducts({
    publishingId: params.publishingId,
    categoryId: searchParams.categoryId,
    ageGroupId: searchParams.ageGroupId,
  });

  const ageGroups = await getAgeGroups();
  const categories = await getCategories();
  const publishing = await getPublishing(params.publishingId);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedProducts = products.slice(startIndex, endIndex);

  return (
    <div className="bg-white">
      <Container>
        <article className="px-4 sm:px-6 lg:px-8 pb-24 pt-4">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <MobileFilters ageGroups={ageGroups} categories={categories} />
            <div className="hidden lg:block">
              <Filter
                valueKey="categoryId"
                name="Категорії"
                data={categories}
              />
              <Filter valueKey="ageGroupId" name="Вік" data={ageGroups} />
            </div>
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              <h1 className="font-bold text-3xl text-amber-950 mb-6">
                Видавництво {publishing.name}
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
          {publishing.description && (
            <div
              className="mt-12 text-justify"
              dangerouslySetInnerHTML={{ __html: publishing.description }}
            />
          )}
        </article>
      </Container>
    </div>
  );
};

export default CategoryPage;
