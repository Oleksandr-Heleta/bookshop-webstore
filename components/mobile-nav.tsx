"use client";

import Button from "@/components/ui/button";
import IconButton from "@/components/ui/icon-button";
import { Category } from "@/type";
import { Dialog } from "@headlessui/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MobileNavProps {
  data: Category[];
}

const MobileNav: React.FC<MobileNavProps> = ({ data }) => {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  return (
    <>
      <Button onClick={onOpen} className="flex items-center gap-x-2 bg-white  text-black md:hidden">
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
          <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-auto bg-white py-4 pb-6 shadow-xl">
            <div className="flex items-center justify-end px-4">
              <IconButton icon={<X size={15} />} onClick={onClose} />
            </div>

            <nav className="p-4 flex flex-col">
              {routes.map((route) => (
                <Link
               
                  key={route.href}
                  href={route.href}
                  onClick={onClose}
                  className={cn(
                    "font-semibold text-lg transition-colors  hover:text-black",
                    route.active ? "text-black" : "text-neutral-500"
                  )}
                >
                  {route.label}
                  <hr className="my-4"/>
                </Link>
              ))}
            </nav>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default MobileNav;
