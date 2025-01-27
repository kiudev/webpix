import { type ReactNode } from "react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen max-w-screen bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100 font-nunito">
      <div className="absolute inset-0 w-full h-full bg-linear-160 from-neutral-100 to-primary-500/60 to-100% dark:from-neutral-900 dark:via-primary-500/30 dark:via-50% dark:to-neutral-900 dark:to-100%"></div>
      <section className="grid grid-flow-row min-h-screen xl:w-[1300px] px-5 md:px-10 lg:m-auto relative">
        <Header />
        {children}
        <Footer />
      </section>
    </div>
  );
}
