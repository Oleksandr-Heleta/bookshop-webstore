import { Metadata, ResolvingMetadata } from 'next';
import qs from 'qs';

import getAgeGroups from '@/actions/get-age-groups';
import getCategories from '@/actions/get-categories';
import getProducts from '@/actions/get-products';
import getPublishings from '@/actions/get-publishing';
import ProductListPage from '@/components/product-list-page';

export const revalidate = 0;

interface SalePageProps {
  searchParams: {
    publishingId: string;
    ageGroupId: string;
    categoryId: string;
    page?: string;
  };
}

interface PageProps {
  params: {
    page?: string;
  };
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // console.log(params);

  const parentMetadata = await parent;
  const previousImages = parentMetadata.openGraph?.images || [];
  const previousKeywords = parentMetadata.keywords || [];

  return {
    title: `Акційні книги| Магазин дитячих книг МИШКА`,
    keywords: [
      `купити книги зі знижкою`,
      `книги розпродаж`,
      `книжки по акції`,
      `дитячі книжки по акції`,
      ...previousKeywords,
    ],
    openGraph: {
      images: [...previousImages],
      title: `Акційні книги| Магазин дитячих книг МИШКА`,
    },
  };
}

const SalePage: React.FC<SalePageProps> = async ({ searchParams }) => {
  const pageSize = 20;
  const currentPage = parseInt(searchParams.page || '1', 10);
  const searchItems = qs.parse(searchParams, {
    comma: true,
  });

  const products = await getProducts({
    isSale: true,
    categories: Array.isArray(searchItems.categories)
      ? searchItems.categories
      : [searchItems.categories],
    ageGroups: Array.isArray(searchItems.ageGroups)
      ? searchItems.ageGroups
      : [searchItems.ageGroups],
    publishings: Array.isArray(searchItems.publishings)
      ? searchItems.publishings
      : [searchItems.publishings],
    maxPrice: Number(searchItems.priceTo),
    minPrice: Number(searchItems.priceFrom),
  });

  const ageGroups = await getAgeGroups({});
  const categories = await getCategories({});
  const publishings = await getPublishings({});

  return (
    <ProductListPage
      title="Акції"
      description={undefined}
      products={products}
      filters={{ ageGroups, categories, publishings }}
      currentPage={currentPage}
      pageSize={pageSize}
    />
  );
};

export default SalePage;
