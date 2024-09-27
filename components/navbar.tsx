import Image from 'next/image';
import Link from 'next/link';

import getAgeGroups from '@/actions/get-age-groups';
import getCategories from '@/actions/get-categories';
import getPublishings from '@/actions/get-publishing';
import MainNav from '@/components/main-nav';
import NavbarActions from '@/components/navbar-actions';
import Container from '@/components/ui/container';

import MobileNav from './mobile-nav';

export const revalidate = 0;

const Navbar = async () => {
  const categories = await getCategories();
  const ageGroups = await getAgeGroups();
  const publishings = await getPublishings();
  return (
    <header className="fixed top-0 left-0 right-0 z-20 md:relative border-b bg-amber-200">
      <Container>
        <div className="  px-4 sm:px-6 lg:px-8 flex h-20 items-center">
          <MobileNav
            categories={categories}
            ageGroups={ageGroups}
            publishings={publishings}
          />
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <Image src="/logo.png" alt="logo" width={50} height={50} />
            <Image src="/name.png" alt="logo" width={100} height={50} />
            {/* <div className='w-[50px]'> */}
            <h2 className="hidden align-middle text-amber-950 text-xl font-semibold uppercase">
              Мишка
            </h2>

            {/* <p className='text-xs text-neutral-500 text-justify'>магазин</p>
            <p className='text-xs text-neutral-500 text-justify'>дитячих</p>
            <p className='text-xs text-neutral-500 text-justify'>книг</p> */}
            {/* </div> */}
          </Link>
          <MainNav
            categories={categories}
            ageGroups={ageGroups}
            publishings={publishings}
          />
          {/* <Contacts/> */}
          <NavbarActions />
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
