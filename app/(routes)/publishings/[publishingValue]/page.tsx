import getProducts from "@/actions/get-products";
import getPublishings from "@/actions/get-publishing";
import getAgeGroups from "@/actions/get-age-groups";
import getCategory from "@/actions/get-category";
import Container from "@/components/ui/container";
import Filter from "./components/filter";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";
import MobileFilters from "./components/mobile-filters";
import getCategories from "@/actions/get-categories";

export const revalidate = 0;

interface CategoryPageProps {
  params: {
    publishingId: string;
   
  };
  searchParams: {
    ageGroupId: string;
    categoryId: string;
  };
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams,
}) => {
  const products = await getProducts({
    publishingId: params.publishingId,
    categoryId: searchParams.categoryId,
    ageGroupId: searchParams.ageGroupId,
    
  });

  const ageGroups = await getAgeGroups();
  const publishings = await getPublishings();
  const categories = await getCategories();
  return (
    <div className="bg-white">
      <Container>
        
        <div className="px-4 sm:px-6 lg:px-8 pb-24 pt-4">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
          <MobileFilters ageGroups={ageGroups} categories={categories}/>
            <div className="hidden lg:block">
            <Filter valueKey="categoryId" name="Категорії" data={categories} />
              <Filter valueKey="ageGroupId" name="Вік" data={ageGroups} />
             
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
