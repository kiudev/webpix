import { createContext, useEffect, type ReactNode, useState, useContext, useLayoutEffect } from "react";
interface ThemeContextType {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: {children: ReactNode}) => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const prefersDarkMode = matchMedia("(prefers-color-scheme: dark)");
    setTheme(prefersDarkMode.matches ? "dark" : "light");

    const handleChange = (e: MediaQueryListEvent) =>
      setTheme(e.matches ? "dark" : "light");
    prefersDarkMode.addEventListener("change", handleChange);

    return () => prefersDarkMode.removeEventListener("change", handleChange);
  }, []);

  useLayoutEffect(() => {
      const root = document.documentElement;

      if (root) {
        root.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);

        if (theme === 'dark') {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      }
    }, [theme]);

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
