import useModalStore from "@/hooks/use-modals";
import useAppStore from "@/store/use-store";
import React from "react";

const Profile = () => {
  const openModal = useModalStore((state) => state.openModal);
  const profile = useAppStore((state) => state.profile);

  return (
    <div className="flex flex-col lg:flex-row items-center lg:justify-between py-6">
      <div className="flex flex-col lg:flex-row items-center lg:items-start  gap-5">
        <div className=" ">
          <img
            src={profile?.profileImage || "./assets/profile.png"}
            alt="profile image"
            className="rounded-lg w-[190px] h-[190px]"
          />
        </div>
        <div className="flex flex-col justify-center items-center lg:items-start lg:justify-start gap-4">
          <h1 className="text-3xl font-semibold text-[#212121]">
            {profile?.name}
          </h1>
          <p className="text-[#212121] "> {profile?.occupation} </p>
          <p className="text-[#212121] max-w-xl text-center lg:text-start text-sm">
            {profile?.bio ||
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
          </p>
          <div
            className="cursor-pointer mt-5  text-center md:text-start"
            onClick={() => openModal("profile")}
          >
            <span className="flex items-center text-[#212121] text-sm font-semibold">
              <img src="./assets/pencil.svg" alt="love" className="mr-2" />
              Edit Profile
            </span>
          </div>
        </div>
      </div>
      <div className=" md:block lg:mt-36 mt-10 w-full lg:w-fit">
        <button
          onClick={() => openModal("createPost")}
          className="bg-black p-4 px-5 items-center justify-center text-white rounded-md flex cursor-pointer w-full "
        >
          <img src="./assets/plus.png" alt="love" className="mr-2" />
          New Post
        </button>
      </div>
    </div>
  );
};

export default Profile;
