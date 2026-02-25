import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen pt-20 bg-base-100">
      <div className="max-w-xl mx-auto px-6 py-12 space-y-10">

        {/* Page Header */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-base-content">Profile</h1>
          <p className="text-sm text-base-content/40">Manage your account information.</p>
        </div>

        {/* Avatar Section */}
        <div className="flex items-center gap-6">
          <div className="relative group flex-shrink-0">
            <img
              src={selectedImg || authUser.profilePic || "/avatar.png"}
              alt="Profile"
              className="size-20 rounded-2xl object-cover border border-base-200/50 shadow-sm transition-opacity group-hover:opacity-90"
            />
            <label
              htmlFor="avatar-upload"
              className={`
                absolute -bottom-2 -right-2
                bg-base-100 border border-base-200/60 text-base-content/60 hover:text-base-content shadow-sm
                p-1.5 rounded-xl cursor-pointer
                transition-all duration-200
                ${isUpdatingProfile ? "animate-pulse pointer-events-none opacity-40" : "hover:bg-base-200/50"}
              `}
            >
              <Camera className="w-4 h-4" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
          <div>
            <p className="font-semibold text-base-content text-base">{authUser?.fullName}</p>
            <p className="text-sm text-base-content/40 mt-0.5">{authUser?.email}</p>
            <p className="text-xs text-base-content/30 mt-2">
              {isUpdatingProfile ? "Uploading photo..." : "Click the camera to change your photo"}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-base-200/50" />

        {/* Info Fields */}
        <div className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-base-content/40 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" /> Full Name
            </label>
            <p className="px-4 py-3 bg-base-200/25 rounded-xl border border-base-200/40 text-sm font-medium text-base-content">
              {authUser?.fullName}
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-base-content/40 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" /> Email Address
            </label>
            <p className="px-4 py-3 bg-base-200/25 rounded-xl border border-base-200/40 text-sm font-medium text-base-content">
              {authUser?.email}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-base-200/50" />

        {/* Account Details */}
        <div className="space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-base-content/40">Account</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-base-content/50">Member since</span>
              <span className="font-medium text-base-content">{authUser.createdAt?.split("T")[0]}</span>
            </div>
            <div className="h-px bg-base-200/40" />
            <div className="flex items-center justify-between">
              <span className="text-base-content/50">Status</span>
              <span className="text-emerald-500 font-semibold text-xs bg-emerald-500/10 px-2.5 py-1 rounded-full">
                Active
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;