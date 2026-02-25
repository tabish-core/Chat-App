import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="px-6 sm:px-8 py-4 border-b border-base-200/30 bg-base-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          {/* Avatar with online ring */}
          <div className="relative flex-shrink-0">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="size-9 rounded-full object-cover"
            />
            {isOnline && (
              <span className="absolute bottom-0 right-0 size-2.5 bg-emerald-500 rounded-full ring-2 ring-base-100" />
            )}
          </div>

          {/* User Info */}
          <div>
            <h3 className="font-semibold text-sm text-base-content leading-tight">{selectedUser.fullName}</h3>
            <p className={`text-xs mt-0.5 font-medium ${isOnline ? "text-emerald-500/80" : "text-base-content/35"}`}>
              {isOnline ? "Active now" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close */}
        <button
          onClick={() => setSelectedUser(null)}
          className="p-2 rounded-xl hover:bg-base-200/50 text-base-content/30 hover:text-base-content transition-colors"
        >
          <X className="w-4 h-4" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;