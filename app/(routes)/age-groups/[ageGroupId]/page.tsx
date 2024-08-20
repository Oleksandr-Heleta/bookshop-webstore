import { Metadata, ResolvingMetadata } from 'next';

import { getAgeGroup } from '@/actions/get-age-groups';
import getCategories from '@/actions/get-categories';
import getProducts from '@/actions/get-products';
import getPublishings from '@/actions/get-publishing';
import Container from '@/components/ui/container';
import NoResults from '@/components/ui/no-results';
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
      title: `Вік ${category.name}| Мишка`,
    },
  };
}

const CategoryPage: React.FC<AgePageProps> = async ({
  params,
  searchParams,
}) => {
  const products = await getProducts({
    ageGroupId: params.ageGroupId,
    categoryId: searchParams.categoryId,
    publishingId: searchParams.publishingId,
  });

  const publishings = await getPublishings();
  const categories = await getCategories();
  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 sm:px-6 lg:px-8 pb-24 pt-4">
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
              {products.length === 0 && <NoResults />}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((product) => (
                  <ProductCard key={product.id} data={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;
