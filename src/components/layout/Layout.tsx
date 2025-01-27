import { type ReactNode } from "react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen max-w-screen bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100 font-geist bg-linear-[160deg] from-neutral-100 to-primary-500/50 to-100% dark:from-neutral-900 dark:via-primary-500/30 dark:via-60% dark:to-neutral-100/20 dark:to-100%">
      <section className="grid grid-flow-row min-h-screen xl:w-[1300px] px-5 md:px-10 lg:m-auto relative">
        <Header />
        {children}
        <Footer />
      </section>
    </div>
  );
}
