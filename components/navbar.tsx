

import Container from "@/components/ui/container";
import MainNav from "@/components/main-nav";
import Link from "next/link";
import Image from "next/image";
import getCategories from "@/actions/get-categories";
import getAgeGroups from "@/actions/get-age-groups";
import getPublishings from "@/actions/get-publishing";
import NavbarActions from "@/components/navbar-actions";
import MobileNav from "./mobile-nav";
import Contacts from "./ui/contacts";

export const revalidate = 0;

const Navbar = async () => {
    const categories = await getCategories();
    const ageGroups = await getAgeGroups();
    const publishings = await getPublishings();
  return (
    <div className="border-b bg-amber-200">
      <Container>
        <div className="relative  px-4 sm:px-6 lg:px-8 flex h-20 items-center">
          <MobileNav categories={categories}  ageGroups={ageGroups} publishings={publishings} />
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <Image src={(process.env.NEXT_PUBLIC_BASE_PATH || '') + '/logo.webp'} alt="logo" width={50} height={50} />
            {/* <div className="w-[50px]"> */}
            <p className="align-middle text-amber-950 text-xl font-semibold uppercase">Мишка</p>
            {/* <p className="text-xs text-neutral-500 text-justify">магазин</p>
            <p className="text-xs text-neutral-500 text-justify">дитячих</p>
            <p className="text-xs text-neutral-500 text-justify">книг</p> */}
            {/* </div> */}
          </Link>
          <MainNav categories={categories}  ageGroups={ageGroups} publishings={publishings} />
          {/* <Contacts/> */}
          <NavbarActions/>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
