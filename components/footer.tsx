import Image from 'next/image';
import Link from 'next/link';

import Contacts from './ui/contacts';

const footerItems = [
  {
    title: 'Про нас',
    link: '/about_us',
  },
  {
    title: 'Доставка і оплата',
    link: '/delivery',
  },
  {
    title: 'Договір публічної оферти',
    link: '/agreement',
  },
  {
    title: 'Повернення товару',
    link: '/povernenia_tovary',
  },
  {
    title: 'Контакти',
    link: '/contacts',
  },
];

const Footer = () => {
  return (
    <footer className="bg-amber-200 border-t">
      <div className="container flex flex-col md:flex-row justify-around items-center mx-auto py-5">
        <div className="flex gap-2">
          <Image
            src="/logo.png"
            alt="Лого магазину - Мишка читає книжку"
            width={100}
            height={100}
          />
          <Image
            src="/name.png"
            alt="Назва магазину - Мишка магазин дитячих книг"
            width={200}
            height={100}
          />
          {/* <p className="align-middle text-amber-950 text-2xl font-semibold uppercase">
            Мишка
          </p> */}
        </div>
        <ul className="flex flex-col justify-center py-5">
          {footerItems.map((item) => (
            <li key={item.title}>
              <Link href={item.link}>
                <div className="text-amber-950 transition-colors hover:text-amber-800">
                  {item.title}
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <Contacts />
      </div>
      <div className="mx-auto py-5">
        <p className="text-center text-xs text-amber-800">
          &copy; 2024 Магазин дитячих книг МИШКА. Всі права захищені.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
