import { iconFile } from "@/assets/icons";
import { useThemeContext } from "@/context/ThemeContext";

export default function Header() {
  const { theme, setTheme } = useThemeContext();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="animate-fadeInUp pt-14">
      <nav className="flex flex-row justify-between items-center">
        <h1 className="font-nunito text-4xl uppercase tracking-widest font-bold text-color-200 dark:text-color-300">
          Webpix
        </h1>

        <button
          onClick={toggleTheme}
          className="-mt-1 text-color-200 dark:text-color-300"
        >
          {theme === "light"
            ? iconFile[2].lightModeIcon
            : iconFile[3].darkModeIcon}
        </button>
      </nav>
    </header>
  );
}
