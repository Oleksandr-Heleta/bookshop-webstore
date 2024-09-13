import { Metadata, ResolvingMetadata } from 'next';

import getAgeGroups from '@/actions/get-age-groups';
import getCategory from '@/actions/get-category';
import getProducts from '@/actions/get-products';
import getPublishings from '@/actions/get-publishing';
import Billboard from '@/components/billboard';
import Container from '@/components/ui/container';
import NoResults from '@/components/ui/no-results';
import Pagination from '@/components/ui/pagination';
import ProductCard from '@/components/ui/product-card';

import Filter from './components/filter';
import MobileFilters from './components/mobile-filters';

export const revalidate = 0;

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    ageGroupId: string;
    publishingId: string;
    page?: string;
  };
}

export async function generateMetadata(
  { params }: CategoryPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const category = await getCategory(params.categoryId);

  const parentMetadata = await parent;
  const previousKeywords = parentMetadata.keywords || [];
  const previousImages = parentMetadata.openGraph?.images || [];

  return {
    title: category.name,
    keywords: [
      category.name,
      `купити ${category.name}`,
      `книги ${category.name}`,
      `книжки ${category.name}`,
      `дитячі ${category.name}`,
      ...previousKeywords,
    ],
    openGraph: {
      images: [...previousImages],
      title: `${category.name}| Магазин дитячих книг МИШКА`,
    },
  };
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams,
}) => {
  const pageSize = 20;
  const currentPage = parseInt(searchParams.page || '1', 10);

  const products = await getProducts({
    categoryId: params.categoryId,
    ageGroupId: searchParams.ageGroupId,
    publishingId: searchParams.publishingId,
  });

  const ageGroups = await getAgeGroups();
  const publishings = await getPublishings();
  const category = await getCategory(params.categoryId);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedProducts = products.slice(startIndex, endIndex);

  return (
    <div className="bg-white">
      <Container>
        <Billboard data={category?.billboard} />
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <MobileFilters ageGroups={ageGroups} publishings={publishings} />
            <div className="hidden lg:block">
              <Filter valueKey="ageGroupId" name="Вік" data={ageGroups} />
              <Filter
                valueKey="publishingId"
                name="Видавництво"
                data={publishings}
              />
            </div>
            <div className="mt-6 lg:col-span-4 lg:mt-0">
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
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;
