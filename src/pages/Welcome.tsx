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
          <h2 className="text-md lg:text-2xl">
            Optimize your web applications better
          </h2>
          <p>
            Converting your images to WEBP, you
            can enhance loading times and improve overall user experience on
            your website. This modern format supports both lossy and lossless
            compression, making it an excellent choice for web applications.
          </p>
        </section>
        <Dropzone />
      </main>
    </Layout>
  );
}
