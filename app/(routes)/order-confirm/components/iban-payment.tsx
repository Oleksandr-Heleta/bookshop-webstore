'use client';

import { Copy } from 'lucide-react';

import Contacts from '@/components/ui/contacts';
import IconButton from '@/components/ui/icon-button';
import { Order } from '@/type';

interface IBANpaymentProps {
  order: Order;
}

const IBANpayment = ({ order }: IBANpaymentProps) => {
  const IBANpayments = [
    { name: 'Одержувач', value: 'ФОП Гелета Олена Іванівна' },
    { name: 'IBAN', value: 'UA073220010000026004340092694' },
    { name: 'ЄДРПОУ', value: '3330111407' },
    {
      name: 'Призначення платежу',
      value: `Оплата книг за замовленням ${order.id} `,
    },
    { name: 'Сума', value: order.totalPrice },
  ];

  return (
    <div className="max-w-lg mt-2 p-2 border border-amber-950 rounded-lg text-sm sm:text-lg">
      <h3 className="font-semibold text-amber-950">Реквізити для оплати</h3>
      {IBANpayments.map(({ name, value }) => (
        <div
          key={name}
          className="grid grid-cols-[1fr,auto] items-center gap-2 mt-2 px-2 text-sm sm:text-lg"
        >
          <p className="col-start-1 col-span-1 font-semibold text-amber-950">
            {name}
          </p>

          <IconButton
            aria-label="Копіювати"
            className="items-center bg-white text-amber-950"
            onClick={() => navigator.clipboard.writeText(String(value))}
            icon={<Copy size={15} />}
          />
          <p className="col-start-1 col-span-2 ">{value}</p>
        </div>
      ))}
      <p className="mt-2 text-sm  text-red-600">
        Оплата зараховується протягом доби. Для пришвидшення опрацювання Вашого
        замовлення після оплати, надішліть скріншот чи фото квитанції за одним
        із контактів:
      </p>
      <Contacts />
    </div>
  );
};

export default IBANpayment;
