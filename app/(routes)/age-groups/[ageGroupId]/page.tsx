import { Metadata, ResolvingMetadata } from 'next';

import { getAgeGroup } from '@/actions/get-age-groups';
import getCategories from '@/actions/get-categories';
import getProducts from '@/actions/get-products';
import getPublishings from '@/actions/get-publishing';
import ProductListPage from '@/components/product-list-page';

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
  const ageGroup = await getAgeGroup(params.ageGroupId);
  const parentMetadata = await parent;
  const previousImages = parentMetadata.openGraph?.images || [];
  const previousKeywords = parentMetadata.keywords || [];
  const previousDescription = parentMetadata.description || '';

  return {
    title:
      ageGroup.titleSeo ??
      `Купити книги для віку ${ageGroup.name} р.| Магазин дитячих книг МИШКА`,
    description: ageGroup.descriptionSeo ?? previousDescription,
    keywords: [
      `купити для ${ageGroup.name} років`,
      `книги для ${ageGroup.name} років`,
      `книжки для ${ageGroup.name} років`,
      `дитячі книжки для ${ageGroup.name} років`,
      ...previousKeywords,
    ],
    openGraph: {
      images: [...previousImages],
      title: `Купити книги для віку ${ageGroup.name} р.| Магазин дитячих книг МИШКА`,
    },
  };
}

const AgePage: React.FC<AgePageProps> = async ({ params, searchParams }) => {
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

  return (
    <ProductListPage
      title={`Книги для віку ${ageGroup.name} років`}
      description={ageGroup.description ?? undefined}
      products={products}
      filters={{ categories, publishings }}
      currentPage={currentPage}
      pageSize={pageSize}
    />
  );
};

export default AgePage;
