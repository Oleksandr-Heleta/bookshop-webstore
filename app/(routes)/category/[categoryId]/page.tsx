import { Metadata, ResolvingMetadata } from 'next';
import qs from 'qs';

import getAgeGroups from '@/actions/get-age-groups';
import getCategory from '@/actions/get-category';
import getProducts from '@/actions/get-products';
import getPublishings from '@/actions/get-publishing';
import ProductListPage from '@/components/product-list-page';

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
  const previousDescription = parentMetadata.description || '';

  return {
    title:
      category.titleSeo ??
      `Купити ${category.name}| Магазин дитячих книг МИШКА`,
    description: category.descriptionSeo ?? previousDescription,
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
      title: `Купити ${category.name}| Магазин дитячих книг МИШКА`,
    },
  };
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams,
}) => {
  const pageSize = 20;
  const currentPage = parseInt(searchParams.page || '1', 10);
  const searchItems = qs.parse(searchParams, {
    comma: true,
  });

  const products = await getProducts({
    categoryId: params.categoryId,
    ageGroups: Array.isArray(searchItems.ageGroups)
      ? searchItems.ageGroups
      : [searchItems.ageGroups],
    publishings: Array.isArray(searchItems.publishings)
      ? searchItems.publishings
      : [searchItems.publishings],
    maxPrice: Number(searchItems.priceTo),
    minPrice: Number(searchItems.priceFrom),
  });

  const ageGroups = await getAgeGroups();
  const publishings = await getPublishings();
  const category = await getCategory(params.categoryId);

  return (
    <ProductListPage
      title={category.name}
      description={category.description ?? undefined}
      products={products}
      filters={{ ageGroups, publishings }}
      currentPage={currentPage}
      pageSize={pageSize}
    />
  );
};

export default CategoryPage;
