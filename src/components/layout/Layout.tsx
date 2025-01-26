import { type ReactNode } from "react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen max-w-screen bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100">
      <div className="absolute inset-0 w-full h-full bg-radial-[at_50%] from-primary-500/10 via-primary-500/5 to-neutral-100 dark:bg-radial-[at_50%] dark:from-primary-500/10 dark:via-primary-500/5 dark:to-neutral-900 to-100%"></div>

      <section className="grid grid-flow-row min-h-screen xl:w-[1300px] px-5 md:px-10 lg:m-auto relative">
        <Header />
        {children}
        <Footer />
      </section>
    </div>
  );
}
