import { ResponsiveModal } from "@/components/responsive-modal";

import useModalStore from "@/hooks/use-modals";
import { CreatePostForm } from "../forms/create-post-form";

export const AddPostModal = () => {
  const { isOpen, modalType, closeModal } = useModalStore();

  return (
    isOpen &&
    modalType === "createPost" && (
      <ResponsiveModal open={isOpen} onOpenChange={closeModal}>
        <CreatePostForm onCancel={closeModal} />
      </ResponsiveModal>
    )
  );
};
