
import React, { useState, useEffect, Fragment } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronsUpDown } from 'lucide-react';



interface Item {
  id: string;
  name: string;
}

interface SelectProps {
  getFn: (query:  string ) => Promise<Item[]>;
  onItemSelect: (item: Item | null) => void;
}

const Select: React.FC<SelectProps> = ({ getFn, onItemSelect }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const getItems = async () => {
        
      try {
        const data = await getFn( query );
       
        setItems(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    if (query) {
      getItems();
      }
  }, [query, getFn ]);

  useEffect(() => {
    onItemSelect(selectedItem);
  }, [selectedItem, onItemSelect]);

  // console.log(items);

  return (
    <div className="w-full">
      <Combobox 
        value={selectedItem} 
        onChange={(value) => {
          setSelectedItem(value);
        //   setIsItemSelected(true);
        }} 
        // disabled={cities.length === 0}
      >
        <div className="relative mt-1">
        <div className="relative w-full cursor-default overflow-hidden  py-1.5  text-gray-900 text-left  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
                className="w-full border-1  bg-white  rounded-full py-2 pl-3 pr-10 text-sm leading-5 shadow-md text-gray-900 focus:ring-0"
                displayValue={(item: Item) => item ? item.name : ''}
                
                onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const newValue = event.target.value;
                  const cyrillicPattern = /^[\u0400-\u04FF0-9\s]+$/; 
                  if (cyrillicPattern.test(newValue) || newValue === ' ') {
                    setQuery(newValue);
                  }
                }}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronsUpDown
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                />
            </Combobox.Button>
        </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {items.length === 0 && query.length !== 0 ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Нічого не знайдено.
                </div>
              ) : (
                items.map((item) => (
                  <Combobox.Option
                    key={item.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-gray-400 text-white' : 'text-gray-900'
                      }`
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {item.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default Select;