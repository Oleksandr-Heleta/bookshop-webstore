"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Category, AgeGroup, Publishing } from "@/type";
import Contacts from "./ui/contacts";
import MenuItem from "./nav-item";

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

  return (
    <nav className="hidden  mx-6 md:flex lg:flex items-center space-x-4 lg:space-x-6">
      {/* {routes.map((route) => (
        <Link
         key={route.href}
         href={route.href}
         className={cn(
            'text-sm font-medium transition-colors  hover:text-black',
            route.active ? 'text-black' : 'text-neutral-500'
         )}>
          {route.label}
        </Link>
      ))} */}
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
          " font-medium transition-colors  hover:text-black",
          pathname === "/delivery" ? "text-black" : "text-neutral-500"
        )}
      >
        Доставка і оплата
      </Link>

      <Contacts />
    </nav>
  );
};

export default MainNav;
