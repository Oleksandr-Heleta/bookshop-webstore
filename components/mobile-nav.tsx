"use client";

import Button from "@/components/ui/button";
import IconButton from "@/components/ui/icon-button";
import { Category, AgeGroup, Publishing } from "@/type";
import { Dialog, Transition } from "@headlessui/react";
import { Menu, X } from "lucide-react";
import { useState, Fragment } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Contacts from "./ui/contacts";
import MobileItem from "./mobile-item";
import Search from "./ui/search";

interface MobileNavProps {
  categories: Category[];
  ageGroups: AgeGroup[];
  publishings: Publishing[];
}

const MobileNav: React.FC<MobileNavProps> = ({
  categories,
  ageGroups,
  publishings,
}) => {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  const onOpen = () => {
   
    setOpen(true);
  };
  const onClose = () => {
   
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={onOpen}
        className="flex items-center gap-x-2 bg-amber-950 text-white lg:hidden"
      >
        <Menu size={20} />
      </Button>

      <Dialog
        open={open}
        as="div"
        className="relative z-40 lg:hidden"
        onClose={onClose}
      >
        <div className="fixed inset-0 bg-black bg-opacity-25" />
        <div className="fixed inset-0 z-40 flex">
          <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-auto bg-amber-200 py-4 pb-6 shadow-xl">
            <div className="flex items-center justify-end px-4">
              <IconButton
                icon={<X size={15} />}
                onClick={onClose}
                className="bg-amber-950 text-white border-amber-950 font-bold"
                
              />
            </div>

            <nav className="p-4 flex flex-col">
              <MobileItem
                links={categories.map((route) => ({
                  href: `/category/${route.id}`,
                  label: route.name,
                  active: pathname === `/category/${route.id}`,
                }))}
                name="Категорії"
                action={onClose}
              />
              <hr className="my-1 border-amber-800" />
              <MobileItem
                links={ageGroups.map((route) => ({
                  href: `/age-groups/${route.id}`,
                  label: route.name,
                  active: pathname === `/age-groups/${route.id}`,
                }))}
                name="Вік"
                action={onClose}
              />
              <hr className="my-1 border-amber-800" />
              <MobileItem
                links={publishings.map((route) => ({
                  href: `/publishings/${route.id}`,
                  label: route.name,
                  active: pathname === `/publishings/${route.id}`,
                }))}
                name="Видавництва"
                action={onClose}
              />
              <hr className="my-1 border-amber-800" />
              <Link
                href="/delivery"
                onClick={onClose}
                className={cn(
                  "font-semibold text-lg transition-colors pl-4 pt-4 hover:text-amber-800",
                  pathname === "/delivery" ? "text-amber-800" : "text-amber-950"
                )}
              >
                Доставка і оплата
              </Link>
              <Search className="mt-4" onClose={onClose} />
            </nav>
            <div className="flex items-center justify-center mt-auto">
              <Contacts />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default MobileNav;