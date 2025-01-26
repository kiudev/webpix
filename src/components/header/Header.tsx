import { iconFile } from "@/assets/icons";
import { useThemeContext } from "@/context/ThemeContext";

export default function Header() {
  const { theme, setTheme } = useThemeContext();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="pt-14">
      <nav className="flex flex-row justify-end items-center">
        <button
          onClick={toggleTheme}
          className="-mt-1 text-color-200 dark:text-color-300 cursor-pointer"
        >
          {theme === "light" ? iconFile.lightModeIcon : iconFile.darkModeIcon}
        </button>
      </nav>
    </header>
  );
}
