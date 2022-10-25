import { useEffect } from "react";

export default function useThemeApp({ isDark, setTheme }) {
  useEffect(() => {
    setTheme("dark");
  }, []);

  useEffect(() => {
    let html = document.querySelectorAll("html")[0];
    let body = document.querySelectorAll("body")[0];

    if (!isDark && html && body) {
      html.style.background = "#ffffff";
      body.style.background =
        "linear-gradient(180deg, rgba(149,0,255,0.05) 0%, rgba(255,171,0,0.05) 50%, rgba(255,255,255,1) 100%)";
    } else {
      html.style.background = "#272B36";
      body.style.background = "#272B36";
    }
  }, [isDark]);

  return null;
}
