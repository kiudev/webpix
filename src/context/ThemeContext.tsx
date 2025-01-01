import { createContext, useEffect, type ReactNode, useState, useLayoutEffect, useContext } from "react";
interface ThemeContextType {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}
export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {}
});

export const ThemeProvider = ({ children }: {children: ReactNode}) => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      return savedTheme;
    }
    return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

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
    <ThemeContext value={{theme, setTheme}}>
      {children}
    </ThemeContext>
  )
}

export function useThemeContext() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}
