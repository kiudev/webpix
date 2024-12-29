import { iconFile } from "@/assets/icons";
import { Dropzone } from "@/components/Dropzone";
import Layout from "@/components/layout/Layout";

export default function Welcome() {
  return (
    <Layout>
      <main className="flex lg:flex-row flex-col items-center gap-20 animate-fadeInUp">
          <section className="flex flex-col gap-3 font-nunito lg:w-[40%]">
            <h1 className="text-3xl lg:text-6xl font-semibold">
              Compress your image to{" "}
              <span className="dark:text-color-400 text-color-200">WEBP</span>
            </h1>
            <h2 className="text-md lg:text-2xl">Optimize your web applications better</h2>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus reiciendis nemo autem ex quas id vero molestiae. Adipisci nulla harum sit accusamus vero alias magni nostrum tempore. Neque, doloremque quas.</p>
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
            <Dropzone />
        </main>

        <footer className="pt-40 relative flex justify-center font-nunito ">
          <p className="absolute bottom-2 flex flex-row gap-1">
            Made with <span className="text-color-200">{iconFile[1].heartIcon}</span> by
            Daniel Saavedra
          </p>
        </footer>
    </Layout>
  )
}

