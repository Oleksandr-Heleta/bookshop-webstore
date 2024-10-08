import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronsUpDown } from 'lucide-react';
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

interface Item {
  id: string;
  name: string;
}

interface SelectProps {
  getFn: (query: string) => Promise<Item[]>;
  onItemSelect: (item: Item | null) => void;
  autoFocus?: boolean;
  errorId?: string;
  errorName?: string;
}

const Select: React.FC<SelectProps> = ({
  getFn,
  onItemSelect,
  autoFocus,
  errorId,
  errorName,
}) => {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [query, setQuery] = useState('');
  const [previousSelectedItem, setPreviousSelectedItem] = useState<Item | null>(
    null
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    const getItems = async () => {
      try {
        const data = await getFn(query);
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    if (query) {
      getItems();
    } else {
      setItems([]);
    }
  }, [query, getFn]);

  const handleItemSelect = useCallback(
    (item: Item | null) => {
      onItemSelect(item);
    },
    [onItemSelect]
  );

  // Перевірка, чи вибраний елемент дійсно змінився
  useEffect(() => {
    if (selectedItem && selectedItem.id !== previousSelectedItem?.id) {
      handleItemSelect(selectedItem);
      setPreviousSelectedItem(selectedItem);
    }
  }, [selectedItem, previousSelectedItem, handleItemSelect]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const cyrillicPattern = /^[\u0400-\u04FF0-9\s]+$/;

    if (cyrillicPattern.test(newValue) || newValue === ' ') {
      setItems([]);
      setQuery(newValue);
    } else {
      setQuery('');
    }
  };

  return (
    <div className="w-full ">
      <Combobox
        value={selectedItem}
        onChange={(value) => setSelectedItem(value)}
        nullable
      >
        <div className="relative mb-1">
          <div className="relative w-full cursor-default overflow-hidden py-1.5 text-gray-900 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-amber-800 sm:text-sm">
            <Combobox.Input
              ref={inputRef}
              className="w-full border-1 bg-white rounded-full py-2 pl-3 pr-10 text-sm leading-5 shadow-md text-amber-950 focus:ring-0"
              displayValue={(item: Item) => (item ? item.name : query)}
              onInput={handleInputChange}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronsUpDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          {!!errorName && (
            <span className="text-red-500 text-sm">{errorName}</span>
          )}
          {!!errorId && <span className="text-red-500 text-sm">{errorId}</span>}
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {items.length === 0 ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Нічого не знайдено.
                </div>
              ) : (
                items.map((item) => (
                  <Combobox.Option
                    key={item.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active
                          ? 'bg-yellow-200 text-amber-950'
                          : 'text-amber-800'
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
                              active ? 'text-amber-950' : 'text-yellow-200'
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
