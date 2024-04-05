

import Container from "@/components/ui/container";
import MainNav from "@/components/main-nav";
import Link from "next/link";
import getCategories from "@/actions/get-categories";
import getAgeGroups from "@/actions/get-age-groups";
import NavbarActions from "@/components/navbar-actions";
import MobileNav from "./mobile-nav";
import Contacts from "./ui/contacts";

export const revalidate = 0;

const Navbar = async () => {
    const categories = await getCategories();
    const ageGroups = await getAgeGroups();
  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <MobileNav data={categories} />
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="font-bold text-xl">Мишка</p>
          </Link>
          <MainNav categories={categories}  ageGroups={ageGroups} />
          {/* <Contacts/> */}
          <NavbarActions/>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
