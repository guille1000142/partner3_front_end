import { useEffect } from "react";

export default function useThemeApp({ isDark, setTheme }) {
  useEffect(() => {
    setTheme("dark");
  }, []);

  useEffect(() => {
    let main = document.querySelectorAll("body")[0];

    if (!isDark) {
      main.style.background =
        "linear-gradient(180deg, rgba(149,0,255,0.05) 0%, rgba(255,171,0,0.05) 50%, rgba(255,255,255,1) 100%)";
    } else {
      main.style.background = "none";
    }
  }, [isDark]);

  return null;
}
