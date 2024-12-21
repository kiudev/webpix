import type { Route } from "./+types/home";
import { useRef, useState, useEffect, type ReactEventHandler } from "react";
import { resources } from "~/assets";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Webpix" },
    { name: "description", content: "Welcome to Webpix!" },
  ];
}

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const [{ imageIcon }, { heartIcon }, { lightModeIcon }, { darkModeIcon }] =
    resources;

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    const prefersDarkMode = matchMedia("(prefers-color-scheme: dark)");
    setTheme(prefersDarkMode.matches ? "dark" : "light");

    const handleChange = (e: MediaQueryListEvent) =>
      setTheme(e.matches ? "dark" : "light");
    prefersDarkMode.addEventListener("change", handleChange);

    return () => prefersDarkMode.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  };

  return (
    <div className="min-h-screen max-w-screen bg-color-300 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(13,19,21,0.2),rgba(255,255,255,0))] text-color-100 dark:bg-color-100 dark:text-color-300 dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(225,231,233,0.2),rgba(255,255,255,0))]">
      <section className="grid lg:w-[1300px] h-screen lg:m-auto px-5">
        <header className="order-1 pt-14">
          <nav className="flex flex-row justify-between items-center">
            <h1
              className='font-nunito text-4xl uppercase tracking-widest font-bold text-color-200 dark:text-color-300'
            >
              Webpix
            </h1>

            <button
              onClick={toggleTheme}
              className="-mt-1 text-color-200 dark:text-color-300"
            >
              {theme === 'light' ? lightModeIcon : darkModeIcon}
            </button>
          </nav>
        </header>

        <main className="order-2">
          <section className="flex flex-col gap-3 font-nunito">
            <h1 className="text-3xl font-semibold animate-fadeInUp">
              Compress your image to{" "}
              <span className="dark:text-color-400 text-color-200">WEBP</span>
            </h1>
            <h2 className="text-md">Optimize your web applications better</h2>
          </section>

          <section className="order-3 border-2 rounded-xl border-color-200 border-dashed p-10 mt-10 text-center font-nunito w-80 m-auto">
            <h2 className="text-xl">
              Drop images <br />
              or
            </h2>
            <input
              ref={fileInputRef}
              className="hidden"
              type="file"
              name=""
              id=""
            />
            <button className="text-color-200 dark:text-color-300" onClick={handleClick}>{imageIcon}</button>
          </section>
        </main>

        <footer className="order-4 relative flex justify-center font-nunito">
          <p className="absolute bottom-2 flex flex-row gap-1">
            Made with <span className="text-color-200">{heartIcon}</span> by
            Daniel Saavedra
          </p>
        </footer>
      </section>
    </div>
  );
}
