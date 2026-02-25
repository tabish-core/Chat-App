import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send, Image as ImageIcon, Check } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "Pretty good", isSent: true },
  { id: 3, content: "Working on anything fun lately?", isSent: false },
];

const THEME_LABELS = {
  light: "Light",
  nord: "Nord",
  lofi: "Lo-Fi",
};

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen bg-base-100 pt-14">
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-8">

        {/* Page Header */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-base-content">Appearance</h1>
          <p className="text-sm text-base-content/40">Choose a theme that matches your vibe.</p>
        </div>

        {/* Side-by-side layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* LEFT — Theme Picker */}
          <div className="w-full lg:w-80 flex-shrink-0 space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-base-content/40">Themes</h2>
            <div className="grid grid-cols-3 gap-2.5">
              {THEMES.map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`
                    group flex flex-col gap-2 p-3 rounded-2xl border transition-all duration-150 text-left cursor-pointer
                    ${theme === t
                      ? "border-base-content/20 bg-base-200/70"
                      : "border-base-200/40 hover:border-base-content/10 hover:bg-base-200/30"
                    }
                  `}
                >
                  {/* Color swatch — scoped to each theme */}
                  <div
                    className="h-8 w-full rounded-xl overflow-hidden grid grid-cols-4 gap-0.5 p-0.5"
                    data-theme={t}
                  >
                    <div className="rounded-[4px] bg-primary" />
                    <div className="rounded-[4px] bg-secondary" />
                    <div className="rounded-[4px] bg-accent" />
                    <div className="rounded-[4px] bg-neutral" />
                  </div>

                  <div className="flex items-center justify-between px-0.5">
                    <span className="text-[11px] font-semibold text-base-content/50 group-hover:text-base-content/80 transition-colors tracking-wide">
                      {THEME_LABELS[t] || t}
                    </span>
                    {theme === t && (
                      <Check className="w-3 h-3 text-base-content/50" strokeWidth={3} />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="hidden lg:block w-px self-stretch bg-base-200/40" />

          {/* RIGHT — Live Preview */}
          <div className="flex-1 space-y-3 min-w-0">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-base-content/40">Preview</h2>

            <div className="rounded-2xl border border-base-200/40 overflow-hidden bg-base-100 shadow-sm">
              {/* Mock Header */}
              <div className="px-5 py-4 border-b border-base-200/30 flex items-center gap-3 bg-base-100">
                <div className="size-8 rounded-full bg-base-200/80 flex items-center justify-center text-xs font-semibold text-base-content/50 flex-shrink-0">
                  T
                </div>
                <div>
                  <p className="text-sm font-semibold text-base-content leading-none">Tabish</p>
                  <p className="text-xs text-emerald-500/70 font-medium mt-0.5">Active now</p>
                </div>
              </div>

              {/* Mock Messages */}
              <div className="px-5 py-6 space-y-4 bg-base-100 min-h-[200px]">
                {PREVIEW_MESSAGES.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.isSent ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`
                        max-w-[80%] px-4 py-2.5 rounded-2xl text-[13px] leading-relaxed font-medium
                        ${msg.isSent
                          ? "bg-base-content text-base-100 rounded-br-sm"
                          : "bg-base-200 text-base-content rounded-bl-sm border border-base-200"
                        }
                      `}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>

              {/* Mock Input */}
              <div className="px-4 py-3.5 border-t border-base-200/30 bg-base-100">
                <div className="flex items-center gap-3 border border-base-200/50 rounded-full px-4 py-2">
                  <ImageIcon size={15} strokeWidth={2} className="text-base-content/25 flex-shrink-0" />
                  <span className="flex-1 text-[13px] text-base-content/25 select-none">Write a message...</span>
                  <div className="size-6 rounded-full bg-base-content flex items-center justify-center flex-shrink-0">
                    <Send size={11} className="ml-px text-base-100" strokeWidth={2.5} />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SettingsPage;