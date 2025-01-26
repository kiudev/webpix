import { Dropzone } from "@/components/Dropzone";
import Layout from "@/components/layout/Layout";

export default function Welcome() {
  return (
    <Layout>
      <main className="flex flex-col mt-0 lg:items-center justify-center gap-10 animate-(--fade-in-up)">
        <section className="flex flex-col gap-3 font-nunito">
          <h1 className=" text-2xl md:text-3xl lg:text-6xl font-semibold">
            Compress your image to{" "}
            <span className="dark:text-primary-500 text-primary-500">WEBP</span>
          </h1>
          <h2 className="text-sm md:text-md lg:text-2xl text-center">
            Optimize your web applications better
          </h2>
          <p className="text-balance hidden md:text-md md:visible">
            Converting your images to WEBP, you
            can enhance loading times and improve overall user experience on
            your website.
          </p>
        </section>
        <Dropzone />
      </main>
    </Layout>
  );
}
