'use client';

import { Dialog } from '@headlessui/react';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';

import Button from '@/components/ui/button';
import IconButton from '@/components/ui/icon-button';
import { AgeGroup, Category, Publishing } from '@/type';

import Filter from './filter';
import { Filters } from './filters';

interface MobileFiltersProps {
  ageGroups?: AgeGroup[];
  categories?: Category[];
  publishings?: Publishing[];
}

const MobileFilters: React.FC<MobileFiltersProps> = ({
  ageGroups,
  categories,
  publishings,
}) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>
      <Button onClick={onOpen} className="flex items-center gap-x-2 lg:hidden">
        Фільтр
        <Plus size={20} />
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
              <IconButton icon={<X size={15} />} onClick={onClose} />
            </div>

            <div className="p-4">
              <Filters
                className="text-amber-950 mx-5 mt-0"
                filtersData={{ ageGroups, categories, publishings }}
              />
              {/* {categories && (
                <Filter
                  valueKey="categoryId"
                  name="Категорії"
                  data={categories}
                />
              )}
              {ageGroups && (
                <Filter valueKey="ageGroupId" name="Вік" data={ageGroups} />
              )}
              {publishings && (
                <Filter
                  valueKey="publishingId"
                  name="Видавництво"
                  data={publishings}
                />
              )} */}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default MobileFilters;
