import { iconFile } from "@/assets/icons";
import { useState } from "react";
export default function Welcome() {
  const [theme, setTheme] = useState("light")
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="min-h-screen max-w-screen bg-color-300 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(13,19,21,0.2),rgba(255,255,255,0))] text-color-100 dark:bg-color-100 dark:text-color-300 dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(225,231,233,0.2),rgba(255,255,255,0))] transition-colors duration-500">
      <section className="grid grid-flow-row min-h-screen lg:w-[1300px] lg:m-auto px-5">
        <header className="animate-fadeInUp pt-14">
          <nav className="flex flex-row justify-between items-center">
            <h1 className="font-nunito text-4xl uppercase tracking-widest font-bold text-color-200 dark:text-color-300">
              Webpix
            </h1>

            <button
              onClick={toggleTheme}
              className="-mt-1 text-color-200 dark:text-color-300"
            >
              {theme === "light" ? iconFile[2].lightModeIcon : iconFile[3].darkModeIcon}
            </button>
          </nav>
        </header>

        <main className="flex lg:flex-row flex-col items-center gap-20 animate-fadeInUp">
          <section className="flex flex-col gap-3 font-nunito lg:w-[40%]">
            <h1 className="text-3xl lg:text-6xl font-semibold">
              Compress your image to{" "}
              <span className="dark:text-color-400 text-color-200">WEBP</span>
            </h1>
            <h2 className="text-md lg:text-2xl">Optimize your web applications better</h2>
      <button type='submit' className='bg-color-200 text-color-300 py-4 px-8 cursor-pointer mt-10 w-40 text-xl'>Start</button>
            {/* <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus reiciendis nemo autem ex quas id vero molestiae. Adipisci nulla harum sit accusamus vero alias magni nostrum tempore. Neque, doloremque quas.</p> */}
          </section>

          {/* <section className="flex flex-col justify-center items-center border-2 rounded-xl border-color-200 border-dashed p-10 mt-10 lg:mt-0 text-center font-nunito w-80 m-auto lg:w-[50%] h-full">
            <h2 className="text-xl">
              Drop images <br />
              or
            </h2>
            <input
              ref={fileInputRef}
              className="hidden"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <button
              className="text-color-200 dark:text-color-300"
              onClick={handleClick}
            >
              {imageIcon}
            </button>

          </section> */}
            {/* <Dropzone /> */}
        </main>

        <footer className="pt-40 relative flex justify-center font-nunito ">
          <p className="absolute bottom-2 flex flex-row gap-1">
            Made with <span className="text-color-200">{iconFile[1].heartIcon}</span> by
            Daniel Saavedra
          </p>
        </footer>
      </section>
    </div>
  )
}

