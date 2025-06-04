import React from "react";
import GalleryItem from "./gallery-item";
import useAppStore from "@/store/use-store";

const Gallery = () => {
  const posts = useAppStore((state) => state.gallery);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-4 bg-[#fdf5e6] border-t border-[#212121] ">
      {posts.map((post, index) => (
        <GalleryItem
          key={index}
          src={post.image}
          title={post.title}
          id={post.id}
          liked={post.liked}
        />
      ))}
    </section>
  );
};

export default Gallery;
