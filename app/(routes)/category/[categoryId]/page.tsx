import { Metadata, ResolvingMetadata } from 'next';
import getProducts from "@/actions/get-products";
import getPublishings from "@/actions/get-publishing";
import getAgeGroups from "@/actions/get-age-groups";
import getCategory from "@/actions/get-category";
import Container from "@/components/ui/container";
import Billboard from "@/components/billboard";
import Filter from "./components/filter";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";
import MobileFilters from "./components/mobile-filters";

export const revalidate = 0;

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    ageGroupId: string;
    publishingId: string;
  };
}

export async function generateMetadata(
  { params, searchParams}: CategoryPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  
  const category = await getCategory(params.categoryId);
 
  const parentMetadata = await parent;
  const previousImages = parentMetadata.openGraph?.images || [];
  const previousKeywords = parentMetadata.keywords || [];
 
  return {
    title: category.name,
    keywords: [category.name, `купити ${category.name}`, `книги ${category.name}`,`книжки ${category.name}`, `дитячі ${category.name}`, ...previousKeywords],
    openGraph: {
      images: [category.billboard.imageUrl, ...previousImages],
      title: `${category.name}| Мишка`,
    },
  }
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams,
}) => {
  const products = await getProducts({
    categoryId: params.categoryId,
    ageGroupId: searchParams.ageGroupId,
    publishingId: searchParams.publishingId,
  });

  const ageGroups = await getAgeGroups();
  const publishings = await getPublishings();
  const category = await getCategory(params.categoryId);
  return (
    <div className="bg-white">
      <Container>
        <Billboard data={category?.billboard} />
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
          <MobileFilters ageGroups={ageGroups} publishings={publishings}/>
            <div className="hidden lg:block">
              <Filter valueKey="ageGroupId" name="Вік" data={ageGroups} />
              <Filter valueKey="publishingId" name="Видавництво" data={publishings} />
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
