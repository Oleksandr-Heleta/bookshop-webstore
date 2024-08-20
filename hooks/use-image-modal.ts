import { create } from 'zustand';

import { Image } from '@/type';

interface ImageModalStore {
  isOpen: boolean;
  data?: Image[];
  startSlide?: number;
  onOpen: (data: Image[], startSlide?: number) => void;
  onClose: () => void;
}

const useImageModal = create<ImageModalStore>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: Image[], startSlide: number = 0) =>
    set({ data: data, isOpen: true, startSlide: startSlide }),
  onClose: () => set({ isOpen: false }),
}));

export default useImageModal;
