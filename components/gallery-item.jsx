import usePreviewStore from "@/hooks/use-preview-post";
import useAppStore from "@/store/use-store";
import React from "react";

const GalleryItem = ({ src, title, id, liked }) => {
  const toggleLike = useAppStore((state) => state.toggleLike);
  const openModal = usePreviewStore((state) => state.openModal);
  return (
    <div className=" overflow-hidden  flex flex-col  transition-shadow duration-200">
      <img
        onClick={() => openModal({ image: src })}
        src={src}
        alt={title}
        className="h-[413px] object-cover rounded cursor-pointer"
      />
      <div className="py-2 text-sm flex justify-between items-center">
        <span className="text-black">{title}</span>
        <button className="cursor-pointer" onClick={() => toggleLike(id)}>
          {liked ? "💖" : "🤍"}
        </button>
      </div>
    </div>
  );
};

export default GalleryItem;
