import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/header";
import Profile from "@/components/profile";
import Gallery from "@/components/gallery";
import Footer from "@/components/footer";
import { EditProfileModal } from "@/components/modals/edit-profile-modal";
import { Toaster } from "sonner";
import { AddPostModal } from "@/components/modals/add-post-modal";
import ImagePreviewModal from "@/components/modals/preview-modal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="bg-white">
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
