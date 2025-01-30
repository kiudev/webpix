import { iconFile } from "@/assets/icons";
import { useThemeContext } from "@/context/ThemeContext";
import { useLanguageContext } from "@/context/LanguageContext";

export default function Header() {
  const { theme, setTheme } = useThemeContext();
  const { handleChangeLanguage } = useLanguageContext();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="pt-14">
      <nav className="flex flex-row justify-between items-center">
        <div className="flex gap-2 font-cal-sans">
          <button className="cursor-pointer text-sm lg:text-base" onClick={() => handleChangeLanguage("en")}>
            {"en".toUpperCase()}
          </button>
          <div className="w-0.5 h-5 bg-neutral-900 dark:bg-neutral-100"></div>
          <button className="cursor-pointer text-sm lg:text-base" onClick={() => handleChangeLanguage("es")}>
            {"es".toUpperCase()}
          </button>
        </div>
        <button
          onClick={toggleTheme}
          className="-mt-1 text-neutral-900 border-neutral-900 dark:text-neutral-100 cursor-pointer border-2 dark:border-neutral-100 rounded-full p-1 lg:p-2"
        >
          {theme === "light" ? iconFile.lightModeIcon : iconFile.darkModeIcon}
        </button>
      </nav>
    </header>
  );
}
