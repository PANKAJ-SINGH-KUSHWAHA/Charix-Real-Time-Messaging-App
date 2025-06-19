import {create} from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "coffee",
  setTheme: (theme) => {
    document.documentElement.setAttribute("data-theme", theme); // ✅ Apply to <html>
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  },
}));
