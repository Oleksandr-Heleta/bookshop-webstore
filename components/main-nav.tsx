'use client';

import { SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MouseEventHandler } from 'react';

import useSearchModal from '@/hooks/use-search-modal';
import { cn } from '@/lib/utils';
import { AgeGroup, Category, Publishing } from '@/type';

import MenuItem from './nav-item';
import Button from './ui/button';
import Contacts from './ui/contacts';

interface MainNavProps {
  categories: Category[];
  ageGroups: AgeGroup[];
  publishings: Publishing[];
}

const MainNav: React.FC<MainNavProps> = ({
  categories,
  ageGroups,
  publishings,
}) => {
  const pathname = usePathname();
  const searchModal = useSearchModal();

  const handleOpenSearch: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    searchModal.onOpen();
  };

  return (
    <nav className="hidden  mx-4 xl:mx-6 lg:flex items-center space-x-4 xl:space-x-6">
      <MenuItem
        links={categories.map((route) => ({
          href: `/category/${route.id}`,
          label: route.name,
          active: pathname === `/category/${route.id}`,
        }))}
        name="Категорії"
      />
      <MenuItem
        links={ageGroups.map((route) => ({
          href: `/age-groups/${route.id}`,
          label: route.name,
          active: pathname === `/age-groups/${route.id}`,
        }))}
        name="Вік"
      />
      <MenuItem
        links={publishings.map((route) => ({
          href: `/publishings/${route.id}`,
          label: route.name,
          active: pathname === `/publishings/${route.id}`,
        }))}
        name="Видавництва"
      />
      <Link
        href="/delivery"
        className={cn(
          ' font-medium transition-colors  hover:text-amber-800',
          pathname === '/delivery' ? 'text-amber-800' : 'text-amber-950'
        )}
      >
        Доставка і оплата
      </Link>
      {/* <Search className='' /> */}
      <Button
        onClick={handleOpenSearch}
        className="flex items-center rounded-full bg-amber-950 px-4 py-2"
      >
        <SearchIcon size={20} color="white" />
      </Button>
      <Contacts />
    </nav>
  );
};

export default MainNav;
