import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-base-100 flex flex-col pt-16">
      <div className="flex-1 flex overflow-hidden max-w-[1600px] mx-auto w-full">
        <Sidebar />
        <main className="flex-1 flex flex-col bg-base-100">
          {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
        </main>
      </div>
    </div>
  );
};
export default HomePage;