import { Metadata, ResolvingMetadata } from 'next';

import { getAgeGroup } from '@/actions/get-age-groups';
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

interface AgePageProps {
  params: {
    ageGroupId: string;
  };
  searchParams: {
    categoryId: string;
    publishingId: string;
    page?: string;
  };
}

export async function generateMetadata(
  { params }: AgePageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // console.log(params);
  const category = await getAgeGroup(params.ageGroupId);

  const parentMetadata = await parent;
  const previousImages = parentMetadata.openGraph?.images || [];
  const previousKeywords = parentMetadata.keywords || [];

  return {
    title: category.name,
    keywords: [
      `купити для ${category.name} років`,
      `книги для ${category.name} років`,
      `книжки для ${category.name} років`,
      `дитячі книжки для ${category.name} років`,
      ...previousKeywords,
    ],
    openGraph: {
      images: [...previousImages],
      title: `Вік ${category.name} р.| Магазин дитячих книг МИШКА`,
    },
  };
}

const CategoryPage: React.FC<AgePageProps> = async ({
  params,
  searchParams,
}) => {
  const pageSize = 20;
  const currentPage = parseInt(searchParams.page || '1', 10);

  const products = await getProducts({
    ageGroupId: params.ageGroupId,
    categoryId: searchParams.categoryId,
    publishingId: searchParams.publishingId,
  });

  const publishings = await getPublishings();
  const categories = await getCategories();
  const ageGroup = await getAgeGroup(params.ageGroupId);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedProducts = products.slice(startIndex, endIndex);
  return (
    <div className="bg-white">
      <Container>
        <article className="px-4 sm:px-6 lg:px-8 pb-24 pt-4">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <MobileFilters categories={categories} publishings={publishings} />
            <div className="hidden lg:block">
              <Filter
                valueKey="categoryId"
                name="Категорії"
                data={categories}
              />
              <Filter
                valueKey="publishingId"
                name="Видавництво"
                data={publishings}
              />
            </div>
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              <h1 className="font-bold text-3xl text-amber-950 mb-6">
                Книги для віку {ageGroup.name} років
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

export default CategoryPage;
