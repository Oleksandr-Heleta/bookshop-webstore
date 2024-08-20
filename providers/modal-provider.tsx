'use client';

import { useEffect, useState } from 'react';

import ImageModal from '@/components/image-modal';
import PreviewModal from '@/components/preview-modal';
import SearchModal from '@/components/search-modal';

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <PreviewModal />
      <SearchModal />
      <ImageModal />
    </>
  );
};

export default ModalProvider;
