import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;


    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }



    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-4 sm:p-6 w-full mt-auto">
      {imagePreview && (
        <div className="mb-4 flex items-center gap-2">
          <div className="relative group">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-16 h-16 object-cover rounded-xl shadow-sm border border-base-200/50"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-base-300 text-base-content/70
              flex items-center justify-center shadow-none hover:bg-base-200 transition-colors opacity-0 group-hover:opacity-100"
              type="button"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-4 w-full bg-base-100 border border-base-200/50 rounded-full px-4 py-2 hover:border-base-200/80 focus-within:border-base-300 transition-colors">
        <div className="flex-1 flex gap-3 items-center">
          <button
            type="button"
            className={`flex items-center justify-center min-w-8 h-8 rounded-full transition-colors
                     ${imagePreview ? "text-base-content bg-base-200/70" : "text-base-content/40 hover:text-base-content/80 hover:bg-base-200/50"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={18} strokeWidth={2} />
          </button>

          <input
            type="text"
            className="w-full bg-transparent border-none text-sm font-normal focus:outline-none focus:ring-0 placeholder:text-base-content/30 text-base-content"
            placeholder="Write a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
        </div>

        {(text.trim() || imagePreview) ? (
          <button
            type="submit"
            className="flex items-center justify-center min-w-8 h-8 rounded-full bg-base-content text-base-100 hover:opacity-80 transition-all scale-100 active:scale-95"
          >
            <Send size={16} className="ml-0.5" strokeWidth={2.5} />
          </button>
        ) : (
          <div className="min-w-8 h-8 rounded-full flex items-center justify-center text-base-content/20">
            <Send size={16} className="ml-0.5" strokeWidth={2} />
          </div>
        )}
      </form>
    </div>
  );
};
export default MessageInput;