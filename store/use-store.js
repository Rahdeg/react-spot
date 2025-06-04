import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "sonner";
import { posts, profile } from "./database";

// Initial data

const useAppStore = create(
  persist(
    (set, get) => ({
      profile: profile,
      gallery: posts,
      initializeProfileAndGallery: () => {
        try {
          const { profile: currentProfile, gallery: currentGallery } = get();

          if (!currentProfile) {
            set({ profile: profile });
          }

          if (!currentGallery || currentGallery.length === 0) {
            set({ gallery: posts });
          }
        } catch (error) {
          toast.error("Failed to initialize profile or gallery.");
        }
      },

      getProfile: () => {
        try {
          return get().profile;
        } catch (error) {
          toast.error("Failed to fetch profile.");
          return null;
        }
      },

      getGallery: () => {
        try {
          const gallery = get().gallery;
          return [...gallery].reverse();
        } catch (error) {
          toast.error("Failed to fetch gallery.");
          return [];
        }
      },

      updateProfile: (updatedProfile) => {
        try {
          set({ profile: { ...get().profile, ...updatedProfile } });
          toast.success("Profile updated.");
        } catch (error) {
          toast.error("Failed to update profile.");
        }
      },

      addGalleryItem: (item) => {
        try {
          set((state) => ({
            gallery: [item, ...state.gallery], // Prepend new item
          }));
          toast.success("Image added to gallery.");
        } catch (error) {
          toast.error("Failed to add image.");
        }
      },

      editGalleryItem: (id, updatedData) => {
        try {
          set((state) => ({
            gallery: state.gallery.map((item) =>
              item.id === id ? { ...item, ...updatedData } : item
            ),
          }));
          toast.success("Gallery item updated.");
        } catch (error) {
          toast.error("Failed to update gallery item.");
        }
      },

      toggleLike: (id) => {
        try {
          set((state) => ({
            gallery: state.gallery.map((item) =>
              item.id === id ? { ...item, liked: !item.liked } : item
            ),
          }));
        } catch (error) {
          toast.error("Failed to toggle like.");
        }
      },
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) state.initializeProfileAndGallery();
      },
    }
  )
);

export default useAppStore;
