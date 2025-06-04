"use client";

import { ResponsiveModal } from "@/components/responsive-modal";

import useModalStore from "@/hooks/use-modals";
import { EditProfileForm } from "../forms/edit-profile-form";
import useAppStore from "@/store/use-store";

export const EditProfileModal = () => {
  const { isOpen, modalType, closeModal } = useModalStore();
  const profile = useAppStore((state) => state.profile);

  return (
    isOpen &&
    modalType === "profile" && (
      <ResponsiveModal open={isOpen} onOpenChange={closeModal}>
        <EditProfileForm onCancel={closeModal} initialValues={profile} />
      </ResponsiveModal>
    )
  );
};
