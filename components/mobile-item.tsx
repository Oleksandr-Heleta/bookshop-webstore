"use client";

import Button from "@/components/ui/button";
import IconButton from "@/components/ui/icon-button";
import { Category } from "@/type";
import { Dialog, Transition } from "@headlessui/react";
import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { useState, Fragment } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Contacts from "./ui/contacts";

interface MobileItemProps {
    links: { href: string; label: string; active: boolean; }[];
    name: string;
    action: () => void;
}

const MobileItem: React.FC<MobileItemProps> = ({ links, name, action }) => {
  const [open, setOpen] = useState(false);

//   const pathname = usePathname();

//   const routes = data.map((route) => ({
//     href: `/category/${route.id}`,
//     label: route.name,
//     active: pathname === `/category/${route.id}`,
//   }));

const onOpen = () => setOpen(true);
const onBack = () => setOpen(false);

    const onClose = () => {
            setOpen(false);
            action();
    };

  return (
    <>
      <Button onClick={onOpen} className="flex items-center gap-x-2 bg-amber-200  text-amber-950 hover:text-amber-800 ">
         {name}
         <ChevronRight size={20} />
      </Button>
     

      <Dialog
        open={open}
        as="div"
        className="relative z-50 lg:hidden"
        onClose={onBack}
      >
        <div className="fixed inset-0 bg-black bg-opacity-25" />
        <div className="fixed inset-0 z-50 flex">
          <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-auto bg-amber-200 py-4 pb-6 shadow-xl">
            <div className="flex items-center justify-between px-4">
            <h3 className="font-semibold text-lg text-amber-950">{name}</h3>
              <IconButton icon={<ChevronLeft size={15} />} onClick={onBack}  className="bg-amber-950 text-white border-amber-950"/>
            </div>

            <nav className="p-4 flex flex-col">
              {links.map((route) => (
                <Link
               
                  key={route.href}
                  href={route.href}
                  onClick={onClose}
                  className={cn(
                    "font-semibold text-lg transition-colors  hover:text-amber-800",
                    route.active ? "text-amber-800" : "text-amber-950"
                  )}
                >
                  {route.label}
                  <hr className="my-4 border-amber-800"/>
                </Link>
              ))}
            </nav>
            <div className="flex items-center justify-center mt-auto">
            <Contacts/>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
      
    </>
  );
};

export default MobileItem;
