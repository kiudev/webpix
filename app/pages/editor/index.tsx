import { useState, useEffect } from "react";
import type { LoaderFunction } from "react-router";
import { useImageContext } from "~/hooks/useImageContext";
import { resources } from "~/assets";

export const Loader: LoaderFunction = async () => {
  return {};
};

export default function Editor() {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [quality, setQuality] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const [{ imageIcon }, { heartIcon }, { lightModeIcon }, { darkModeIcon }] =
    resources;

  const { image } = useImageContext();

  const handleDownload = () => {
    if (!image) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = width * scale;
      canvas.height = height * scale;
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/jpeg", quality);
      link.download = "optimized-image.jpg";
      link.click();
    };

    img.src = image as string;
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
      <header className="order-1 pt-14">
        <nav className="flex flex-row justify-between items-center">
          <h1 className="font-nunito text-4xl uppercase tracking-widest font-bold text-color-200 dark:text-color-300">
            Webpix
          </h1>

          <button
            onClick={toggleTheme}
            className="-mt-1 text-color-200 dark:text-color-300"
          >
            {theme === "light" ? lightModeIcon : darkModeIcon}
          </button>
        </nav>
      </header>
      <div>
        <label>
          Width:
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Height:
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Quality:
          <input
            type="number"
            step="0.1"
            min="0"
            max="1"
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Scale:
          <input
            type="number"
            step="0.1"
            min="0"
            value={scale}
            onChange={(e) => setScale(Number(e.target.value))}
          />
        </label>
      </div>
      <button onClick={handleDownload}>Download Optimized Image</button>
      {image && (
        <img
          src={image as string}
          alt="Selected"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      )}
    </div>
  );
}
