import { Metadata, ResolvingMetadata } from 'next';
import qs from 'qs';

import getAgeGroups from '@/actions/get-age-groups';
import getCategories from '@/actions/get-categories';
import getProducts from '@/actions/get-products';
import { getPublishing } from '@/actions/get-publishing';
import ProductListPage from '@/components/product-list-page';

export const revalidate = 0;

interface PublishingPageProps {
  params: {
    publishingId: string;
  };
  searchParams: {
    ageGroups: string;
    categories: string;
    page?: string;
  };
}

export async function generateMetadata(
  { params }: PublishingPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
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

const PublishingPage: React.FC<PublishingPageProps> = async ({
  params,
  searchParams,
}) => {
  const pageSize = 20;

  const searchItems = qs.parse(searchParams, {
    comma: true,
  });
  const currentPage = parseInt(searchParams.page || '1', 10);
  // console.log(searchItems);
  const products = await getProducts({
    publishingId: params.publishingId,

    categories: Array.isArray(searchItems.categories)
      ? searchItems.categories
      : [searchItems.categories],
    ageGroups: Array.isArray(searchItems.ageGroups)
      ? searchItems.ageGroups
      : [searchItems.ageGroups],
    maxPrice: Number(searchItems.priceTo),
    minPrice: Number(searchItems.priceFrom),
  });

  const ageGroups = await getAgeGroups();
  const categories = await getCategories();
  const publishing = await getPublishing(params.publishingId);

  return (
    <ProductListPage
      title={`Видавництво ${publishing.name}`}
      description={publishing.description ?? undefined}
      products={products}
      filters={{ ageGroups, categories }}
      currentPage={currentPage}
      pageSize={pageSize}
    />
  );
};

export default PublishingPage;
