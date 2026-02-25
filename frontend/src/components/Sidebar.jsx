import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) return <SidebarSkeleton />;

  const onlineCount = users.filter((u) => onlineUsers.includes(u._id)).length;

  return (
    <aside className="h-full w-20 lg:w-[300px] border-r border-base-200/50 flex flex-col transition-all duration-200 bg-base-100">
      {/* Header */}
      <div className="border-b border-base-200/40 w-full px-6 py-5 lg:px-7">
        <div className="hidden lg:flex items-center justify-between">
          <span className="font-semibold text-sm tracking-wide text-base-content">Messages</span>
          {onlineCount > 0 && (
            <span className="text-xs font-medium text-base-content/40 bg-base-200/50 px-2.5 py-1 rounded-full">
              {onlineCount} online
            </span>
          )}
        </div>
        {/* Mobile: just a dot indicator */}
        <div className="flex lg:hidden justify-center">
          <div className="size-2 rounded-full bg-base-content/20" />
        </div>
      </div>

      {/* User List */}
      <div className="overflow-y-auto w-full py-3 px-2 lg:px-3 space-y-0.5">
        {users.map((user) => {
          const isOnline = onlineUsers.includes(user._id);
          const isSelected = selectedUser?._id === user._id;
          return (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`
                w-full p-3 lg:px-4 lg:py-3.5 flex items-center gap-3.5 rounded-2xl transition-all duration-150
                ${isSelected
                  ? "bg-base-content/[0.07] text-base-content"
                  : "text-base-content/70 hover:bg-base-content/[0.04]"
                }
              `}
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0 mx-auto lg:mx-0">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.fullName}
                  className="size-11 object-cover rounded-full"
                />
                {isOnline && (
                  <span className="absolute bottom-0 right-0 size-3 bg-emerald-500 rounded-full ring-2 ring-base-100" />
                )}
              </div>

              {/* User info */}
              <div className="hidden lg:flex flex-col text-left min-w-0 flex-1 gap-0.5">
                <span className="font-medium text-sm truncate text-base-content leading-tight">{user.fullName}</span>
                <span className={`text-xs truncate ${isOnline ? "text-emerald-500/70" : "text-base-content/35"}`}>
                  {isOnline ? "Active now" : "Offline"}
                </span>
              </div>
            </button>
          );
        })}

        {users.length === 0 && (
          <div className="text-center text-base-content/30 py-16 text-sm">
            No contacts yet.
          </div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;