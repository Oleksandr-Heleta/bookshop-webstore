import { Dialog } from "@headlessui/react";
import Modal from "@/components/ui/modal";
import useSearchModal from "@/hooks/use-search-modal";
import Search from "./ui/search"; // Assuming Search is the component for the search functionality

const SearchModal = () => {
  const { isOpen, onClose } = useSearchModal();

  return (
   
  <Modal open={isOpen} onClose={onClose}>
<Search autoFocus className="w-full mt-4 h-auto" onClose={onClose} />
</Modal> 

  );
};

export default SearchModal;