import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100">
      <div className="max-w-sm text-center space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="size-20 rounded-3xl bg-base-200/60 flex items-center justify-center shadow-none">
            <MessageSquare className="w-9 h-9 text-base-content/40" strokeWidth={1.5} />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight text-base-content">
            No conversation selected
          </h2>
          <p className="text-sm text-base-content/40 leading-relaxed max-w-xs mx-auto">
            Pick someone from the sidebar to start a conversation with them.
          </p>
        </div>

        {/* Subtle decoration */}
        <div className="flex items-center justify-center gap-2 pt-2">
          <div className="h-px w-10 bg-base-content/10 rounded-full" />
          <span className="text-xs text-base-content/20 font-medium tracking-widest uppercase">TabTalk</span>
          <div className="h-px w-10 bg-base-content/10 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;