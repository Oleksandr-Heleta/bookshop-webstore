'use client';

import Info from '@/components/info';
import Modal from '@/components/ui/modal';
// import Gallery from '@/components/gallery';
import Slider from '@/components/ui/slider';
import usePreviewModal from '@/hooks/use-preview-modal';

const PreviewModal = () => {
  const previewModal = usePreviewModal();
  const product = usePreviewModal((state) => state.data);

  if (!product) {
    return null;
  }

  return (
    <Modal open={previewModal.isOpen} onClose={previewModal.onClose}>
      <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8 ">
        <div className="sm:col-span-4 lg:col-span-5 relative">
          <div className="absolute top-10 left-0 z-10 flex flex-col gap-2">
            {product.isNew && (
              <div className=" bg-red-600 text-white rounded-lg p-1 tracking-wide text-sm font-semibold">
                Новинка
              </div>
            )}
            {product.isSale && (
              <div className=" bg-orange-500 text-white text-center rounded-lg p-1 text-sm font-semibold">
                - {product.sale} %
              </div>
            )}
          </div>
          <Slider slides={product?.images} />
        </div>
        <div className="sm:col-span-8 lg:col-span-7">
          <Info data={product} />
        </div>
      </div>
    </Modal>
  );
};

export default PreviewModal;
