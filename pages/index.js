import { Poppins } from "next/font/google";
import Header from "@/components/header";
import Profile from "@/components/profile";
import Gallery from "@/components/gallery";
import Footer from "@/components/footer";
import { EditProfileModal } from "@/components/modals/edit-profile-modal";
import { Toaster } from "sonner";
import { AddPostModal } from "@/components/modals/add-post-modal";
import ImagePreviewModal from "@/components/modals/preview-modal";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function Home() {
  return (
    <div className={cn("bg-white", poppins.className)}>
      <Toaster />
      <ImagePreviewModal />
      <EditProfileModal />
      <AddPostModal />
      <div className="min-h-screen flex flex-col ">
        <Header />
        <div className="px-10 bg-[#FCF5E5]">
          <Profile />
          <Gallery />
          <Footer />
        </div>
      </div>
    </div>
  );
}
