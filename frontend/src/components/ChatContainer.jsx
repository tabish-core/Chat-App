import { useChatStore } from "../store/useChatStore.js";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader.jsx";
import MessageInput from "./MessageInput.jsx";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore.js";
import { formatMessageTime } from "../lib/utils.js";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-base-100">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-10 sm:py-8 space-y-6">
        {messages.map((message, index) => {
          const isOwn = message.senderId === authUser._id;
          const isLast = index === messages.length - 1;
          return (
            <div
              key={message._id}
              className={`flex ${isOwn ? "justify-end" : "justify-start"} group`}
              ref={isLast ? messageEndRef : null}
            >
              <div className={`flex items-end gap-2.5 max-w-[80%] sm:max-w-[70%] ${isOwn ? "flex-row-reverse" : "flex-row"}`}>

                {/* Avatar */}
                <div className="flex-shrink-0 self-end">
                  <img
                    src={isOwn ? authUser.profilePic || "/avatar.png" : selectedUser.profilePic || "/avatar.png"}
                    alt="avatar"
                    className="size-7 rounded-full object-cover opacity-80"
                  />
                </div>

                {/* Bubble + Timestamp */}
                <div className={`flex flex-col gap-1 ${isOwn ? "items-end" : "items-start"}`}>
                  <div
                    className={`
                      max-w-full text-[14.5px] leading-relaxed
                      ${isOwn
                        ? "bg-base-content text-base-100 rounded-2xl rounded-br-sm"
                        : "bg-base-200/60 text-base-content rounded-2xl rounded-bl-sm"
                      }
                    `}
                  >
                    {message.image && (
                      <div className={`${message.text ? "p-2 pb-0" : "p-2"}`}>
                        <img
                          src={message.image}
                          alt="Attachment"
                          className="sm:max-w-[260px] rounded-xl object-cover"
                        />
                      </div>
                    )}
                    {message.text && (
                      <p className="px-4 py-2.5">{message.text}</p>
                    )}
                  </div>

                  {/* Timestamp - always visible, subtle */}
                  <time className="text-[11px] font-medium text-base-content/30 tracking-wide px-1">
                    {formatMessageTime(message.createdAt)}
                  </time>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;