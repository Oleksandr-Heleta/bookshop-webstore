import Currency from "./currency";


interface CheckSaleProps {
    sail: boolean;
    percent: number;
    price: number;
};

const CheckSale: React.FC<CheckSaleProps> = ({sail, percent, price}) => {
    return (
        <>
            {sail ? (
                <div className='flex gap-2 justify-self-end'>
                    <p className='line-through text-gray-500'>
                        <Currency value={price} />
                    </p>
                    <p><Currency value={(price * (100 - percent)) / 100} /></p>
                </div>
            ) : (
                <Currency value={price} />
            )}
        </>
    );
};

export default CheckSale;