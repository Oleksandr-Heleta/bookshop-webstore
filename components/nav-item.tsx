import { Menu, Transition } from '@headlessui/react'
import { cn } from '@/lib/utils';

interface MenuItemProps {
    links: { href: string; label: string; active: boolean; }[];
    name: string;
    }

const MenuItem: React.FC<MenuItemProps> = ({links, name}) => {
  return (
    <Menu as="div" className="relative">
    
      <Menu.Button>{name}</Menu.Button>
    
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
    </Menu>
  )
}

export default MenuItem;