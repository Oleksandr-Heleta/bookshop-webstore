import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";
import Gallery from "@/components/gallery";
import Slider from "@/components/ui/slider";
import Info from "@/components/info";

export const revalidate = 0;

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const product = await getProduct(params.productId);
  const suggestedProducts = await getProducts({
    categoryId: product?.categories?.[0].categoryId ?? null,
  });
  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
            {/* <Gallery images={product?.images} /> */}
            <Slider slides={product?.images.map((image) => image.url)} />
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                <Info data={product}/>
                <div className="mt-10">
                    <h3 className="font-semibold text-black">Опис:</h3>
                    <p className="mt-4 text-gray-700">{product?.description}</p>
                </div>
            </div>
          </div>
          <hr className="my-10 " />
          <ProductList title="Можливо зацікавить" items={suggestedProducts} />
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
