import { MouseEventHandler } from 'react';

import { cn } from '@/lib/utils';

interface IconButtonProps {
  icon: React.ReactElement;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-full flex items-center justify-center bg-amber-950 text-white border border-amber-950 shadow-md p-2 hover:scale-110 transition',
        className
      )}
    >
      {icon}
    </button>
  );
};

export default IconButton;
