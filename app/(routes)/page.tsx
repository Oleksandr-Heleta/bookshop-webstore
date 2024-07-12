import Container from "@/components/ui/container";
import Billboard from "@/components/billboard";
import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import getStoreInfo from "@/actions/get-storeinfo";
import ProductList from "@/components/product-list";
import MainSlider from "@/components/main-slider";

export const revalidate = 0;

const HomePage = async () => {
  const newProducts = await getProducts({ isFeatured: true , isNew: true });
  const saleProducts = await getProducts({ isFeatured: true , isSale: true });
  const billboard = await getBillboard("cf4c6ea7-2b8d-46f8-95b4-9ada229145b9");
  const info = await getStoreInfo();
  console.log(info.mainbillboards);
  return (
    <Container>
      <div className="space-y-10 pb-10">
        {info.mainbillboards?.length>=1 ? <MainSlider billboards={info.mainbillboards} />  : <Billboard data={billboard}/> }

        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Новинки" items={newProducts} />
        </div>
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Акції" items={saleProducts} />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
