'use client';

import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Fragment } from 'react';

import IconButton from '@/components/ui/icon-button';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  const initialFocusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && initialFocusRef.current) {
      initialFocusRef.current.focus();
    }
  }, [open]);

  return (
    <Transition show={open} appear as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40"
        onClose={onClose}
        initialFocus={initialFocusRef}
      >
        <div className="fixed inset-0 bg-black bg-opacity-50" />

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-0 sm:p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full h-auto max-w-3xl  rounded-lg text-left align-middle relative flex  items-center  bg-white px-2 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                <div className="absolute right-4 top-4 z-10">
                  <IconButton
                    onClick={(event) => {
                      event.stopPropagation();
                      onClose();
                    }}
                    icon={<X size={15} />}
                  />
                </div>
                <div ref={initialFocusRef} className="w-full">
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
