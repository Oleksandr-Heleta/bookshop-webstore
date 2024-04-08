import { Menu, Transition } from '@headlessui/react'
import { cn } from '@/lib/utils';
import { ChevronDownIcon } from 'lucide-react';

interface MenuItemProps {
    links: { href: string; label: string; active: boolean; }[];
    name: string;
    }

const MenuItem: React.FC<MenuItemProps> = ({links, name}) => {
  return (
    <Menu as="div" className="relative z-50">
      {({ open }) => (
        <>
  
      <Menu.Button className={cn('flex text-neutral-500 hover:text-black', open && 'text-black')}>
        {name}
      <ChevronDownIcon
              className={cn("-mr-1 ml-2 h-5 w-5 text-neutral-500 ", open && 'transform rotate-180 text-black')}
              aria-hidden="true"
            />
      </Menu.Button>


<Transition
            show={open}
            className='z-50'
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
    
      <Menu.Items className="absolute left-0 z-50 flex flex-col mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
        {links.map((link) => (
          <Menu.Item
            as="a"
            key={link.href}
            href={link.href}
            className={cn(
                'block p-3 text-sm font-medium transition-colors  hover:text-black',
                link.active ? 'text-black' : 'text-neutral-500'
             )}
          >
            {link.label}
          </Menu.Item>
        ))}
      </Menu.Items>
      </Transition>
      </>
      )}
    </Menu>
  )
}

export default MenuItem;