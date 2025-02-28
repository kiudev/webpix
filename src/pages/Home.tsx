import { Dropzone } from "@/components/Dropzone";
import Layout from "@/components/layout/Layout";
import { useLanguageContext } from "@/context/LanguageContext";

export default function Home() {
  const { t, animate } = useLanguageContext();

  return (
    <Layout>
      <main className="flex flex-col mt-0 lg:items-center justify-center gap-10 animate-(--fade-in-up)">
        <section className="flex flex-col justify-center items-center gap-5 w-full">
          <h1
            className={`text-3xl md:text-5xl lg:text-6xl font-cal-sans tracking-wide transition-all text-center ${
              animate ? "animate-(--fade-in)" : ""
            }`}
          >
            {t("Compress your image to")}{" "}
            <span className="dark:text-primary-500 text-primary-600">WEBP</span>
          </h1>
          <h2
            className={`text-base md:text-lg lg:text-xl text-center ${
              animate ? "animate-(--fade-in)" : ""
            }`}
          >
            {t("Optimize your web applications better")}
          </h2>
          {/* <p className="text-balance hidden md:text-md md:visible">
            Converting your images to WEBP, you can enhance loading times and
            improve overall user experience on your website.
          </p> */}
          <Dropzone />
        </section>
      </main>
    </Layout>
  );
}
