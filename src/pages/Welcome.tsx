import { Dropzone } from "@/components/Dropzone";
import Layout from "@/components/layout/Layout";
import { useLanguageContext } from "@/context/LanguageContext";

export default function Welcome() {
  const { t, animate } = useLanguageContext();

  return (
    <Layout>
      <main className="flex flex-col mt-0 lg:items-center justify-center gap-10 animate-(--fade-in-up)">
        <section className="flex flex-col justify-center items-center gap-5 w-full">
          <h1 className={`text-2xl md:text-3xl lg:text-6xl font-cal-sans tracking-wide transition-all ${animate ? "animate-(--fade-in)" : ""}`}>
            {t("Compress your image to")}{" "}
            <span className="dark:text-primary-500 text-primary-500">WEBP</span>
          </h1>
          <h2 className={`text-sm md:text-md lg:text-xl text-center ${animate ? "animate-(--fade-in)" : ""}`}>
            {t("Optimize your web applications better")}
          </h2>
          <p className="text-balance hidden md:text-md md:visible">
            Converting your images to WEBP, you
            can enhance loading times and improve overall user experience on
            your website.
          </p>
        <Dropzone />
        </section>
      </main>
    </Layout>
  );
}
