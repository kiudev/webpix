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
          className="-mt-1 text-primary-700 border-primary-700 dark:text-primary-500 cursor-pointer border-2 dark:border-primary-500 rounded-full p-2"
        >
          {theme === "light" ? iconFile.lightModeIcon : iconFile.darkModeIcon}
        </button>
      </nav>
    </header>
  );
}
