"use client";

import useImageModal from "@/hooks/use-image-modal";
import Modal from "@/components/ui/modal";
// import Gallery from "@/components/gallery";
import ZoomImageSlider from "@/components/ui/zoom-image-slider";


const ImageModal = () => {
  const previewModal = useImageModal();
  const images = useImageModal((state) => state.data);
  const startSlide = useImageModal((state) => state.startSlide);


  if (images?.length === 0) {
    return null;
  }

  return (
    
    <Modal open={previewModal.isOpen} onClose={previewModal.onClose}>
      
          <ZoomImageSlider slides={images?.map((image) => image.url) ?? []} startSlide={startSlide} />
        
    </Modal>
  );
};

export default ImageModal;
