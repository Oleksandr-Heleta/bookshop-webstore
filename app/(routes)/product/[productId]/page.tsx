import { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';

import getProduct from '@/actions/get-product';
import getProducts from '@/actions/get-products';
import Info from '@/components/info';
import ProductList from '@/components/product-list';
import Container from '@/components/ui/container';
import Slider from '@/components/ui/slider';
import { ProdAgeGroup, ProdCategory } from '@/type';

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
                <section className="flex items-center flex-wrap gap-x-2 sm:gap-x-4 sm:flex-nowrap">
                  <h3 className="font-semibold text-amber-950">Категорії:</h3>
                  {product?.categories?.map((category: ProdCategory) => (
                    <p key={category.categoryId}>
                      <Link
                        href={`/category/${category.categoryId}`}
                        className="amber-950 hover:amber-600"
                      >
                        {category.categoryName}
                      </Link>
                    </p>
                  ))}
                </section>
                <section className="flex items-center gap-x-4">
                  <h3 className="font-semibold text-amber-950">Вік:</h3>
                  {product?.ageGroups?.map((age: ProdAgeGroup) => (
                    <p key={age.ageGroupId}>
                      <Link
                        href={`/age-groups/${age.ageGroupId}`}
                        className="amber-950 hover:amber-600"
                      >
                        {age.ageGroupName}
                      </Link>
                    </p>
                  ))}
                </section>
                <section className="flex items-center gap-x-4">
                  <h3 className="font-semibold text-amber-950">Видавництво:</h3>
                  <p>
                    <Link
                      href={`/publishings/${product?.publishing?.id}`}
                      className="amber-950 hover:amber-600"
                    >
                      {product?.publishing?.name}
                    </Link>
                  </p>
                </section>
                {product?.seria && (
                  <section className="flex items-center gap-x-4">
                    <h3 className="font-semibold text-amber-950">Серія:</h3>
                    <p>
                      <Link
                        href={`/seria/${product.seria.id}`}
                        className="amber-950 hover:amber-600"
                      >
                        {product.seria.name}
                      </Link>
                    </p>
                  </section>
                )}
                {product?.author && (
                  <section className="flex items-center gap-x-4">
                    <h3 className="font-semibold text-amber-950">Автор:</h3>
                    <p>{product.author}</p>
                  </section>
                )}
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
            items={
              product.suggestionProducts.length !== 0
                ? product.suggestionProducts
                : suggestedProducts
                    .slice(0, 5)
                    .filter((p) => p.id !== product.id)
                    .slice(0, 4)
            }
          />
        </article>
      </Container>
    </div>
  );
};

export default ProductPage;
