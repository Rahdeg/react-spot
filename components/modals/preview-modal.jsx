import React, { useEffect, useRef } from "react";

import { X } from "lucide-react";
import usePreviewStore from "@/hooks/use-preview-post";

const ImagePreviewModal = () => {
  const { isOpen, data, closeModal } = usePreviewStore();
  const modalRef = useRef(null);
  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className="relative w-full max-w-3xl bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 z-10 text-white hover:text-red-600"
        >
          <X size={24} />
        </button>

        <div className="w-full max-h-[90vh] overflow-auto flex items-center justify-center bg-black">
          <img
            src={data?.image}
            alt="preview"
            className="w-full object-contain max-h-[80vh]"
          />
        </div>
      </div>
    </div>
  );
};

export default ImagePreviewModal;
