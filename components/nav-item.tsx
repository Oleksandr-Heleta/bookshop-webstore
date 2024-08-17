import { Menu, Transition } from '@headlessui/react'
import { cn } from '@/lib/utils';
import { ChevronDownIcon } from 'lucide-react';

interface MenuItemProps {
    links: { href: string; label: string; active: boolean; }[];
    name: string;
    }

const MenuItem: React.FC<MenuItemProps> = ({links, name}) => {
  return (
    <Menu as="div" className="relative z-30">
      {({ open }) => (
        <>
  
      <Menu.Button className={cn('flex font-medium text-amber-950 hover:text-amber-800', open && 'text-amber-800')}>
        {name}
      <ChevronDownIcon
              className={cn("-mr-1 ml-2 h-5 w-5 text-amber-950", open && 'transform rotate-180 text-amber-800')}
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
    
      <Menu.Items className="absolute left-0 z-40 flex flex-col mt-2 w-56 origin-top-right divide-y divide-amber-950 rounded-md bg-white border-amber-950  shadow-lg ring-1 ring-black/5 focus:outline-none">
        {links.map((link) => (
          <Menu.Item
            as="a"
            key={link.href}
            href={link.href}
            className={cn(
                'block p-3 text-sm font-medium transition-colors  hover:text-amber-800 hover:bg-amber-200',
                link.active ? 'text-amber-800' : 'text-amber-950'
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