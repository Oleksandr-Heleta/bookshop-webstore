import { useInfo } from '@/providers/info-provider';

import Currency from './currency';

interface CheckSaleProps {
  isSale: boolean;
  percent: number;
  price: number;
}

const CheckSale: React.FC<CheckSaleProps> = ({ isSale, percent, price }) => {
  const { sale } = useInfo() || { sale: 0 };
  const salePercent = sale > percent ? sale : percent;

  // console.log(salePercent);

  return (
    <>
      {isSale || sale ? (
        <div className="flex flex-wrap gap-2  ">
          <p className="line-through text-gray-500">
            <Currency value={price} />
          </p>
          <p>
            <Currency value={(price * (100 - salePercent)) / 100} />
          </p>
        </div>
      ) : (
        <Currency value={price} />
      )}
    </>
  );
};

export default CheckSale;
