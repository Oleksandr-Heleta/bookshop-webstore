import { Metadata, ResolvingMetadata } from 'next';

import getProduct from '@/actions/get-product';
import getProducts from '@/actions/get-products';
import Info from '@/components/info';
import ProductList from '@/components/product-list';
import Container from '@/components/ui/container';
import Slider from '@/components/ui/slider';

export const revalidate = 0;

interface ProductPageProps {
  params: {
    productId: string;
  };
}

export async function generateMetadata(
  { params }: ProductPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.productId;

  const product = await getProduct(id);

  // optionally access and extend (rather than replace) parent metadata
  const parentMetadata = await parent;
  const previousImages = parentMetadata.openGraph?.images || [];
  const previousKeywords = parentMetadata.keywords || [];

  return {
    title: product.name,
    keywords: [
      product.name,
      `купити ${product.name}`,
      `книга ${product.name}`,
      `книжка ${product.name}`,
      `дитяча книга ${product.name}`,
      ...previousKeywords,
    ],
    openGraph: {
      images: [product.images[0].url, ...previousImages],
      title: `${product.name}| Магазин дитячих книг Мишка`,
    },
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const product = await getProduct(params.productId);
  const suggestedProducts = await getProducts({
    ageGroupId: product?.ageGroups?.[0].ageGroupId ?? null,
  });

  const title = product.titleSheet == 'Solid' ? 'Тверда' : "М'яка";

  return (
    <div className="bg-white">
      <Container>
        <article className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 relative">
            <div className="absolute top-10 left-0 z-10 flex flex-col gap-2">
              {product.isNew && (
                <div className=" bg-red-600 text-white rounded-lg p-1 tracking-wider text-lg font-semibold">
                  Новинка
                </div>
              )}
              {product.isSale && (
                <div className=" bg-orange-500 text-white rounded-lg p-1 text-lg font-semibold">
                  - {product.sale} %
                </div>
              )}
            </div>
            {/* <Gallery images={product?.images} /> */}
            <Slider slides={product?.images} />
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <Info data={product}>
                <section className="flex items-center gap-x-4">
                  <h3 className="font-semibold text-amber-950">Видавництво:</h3>
                  <p>{product?.publishing?.name}</p>
                </section>
                <section className="flex items-center gap-x-4">
                  <h3 className="font-semibold text-amber-950">Обкладинка:</h3>
                  <p>{title}</p>
                </section>
                <section className="flex items-center gap-x-4">
                  <h3 className="font-semibold text-amber-950">
                    Кількість сторінок:
                  </h3>
                  <p>{product?.sheets}</p>
                </section>
                <section className="flex items-center gap-x-4">
                  <h3 className="font-semibold text-amber-950">Розмір:</h3>
                  <p>{product?.size}</p>
                </section>
              </Info>
            </div>
          </div>
          <hr className="my-10 " />
          <ProductList
            title="Можливо зацікавить"
            items={suggestedProducts
              .slice(0, 4)
              .filter((p) => p.id !== product.id)
              .slice(0, 3)}
          />
        </article>
      </Container>
    </div>
  );
};

export default ProductPage;
