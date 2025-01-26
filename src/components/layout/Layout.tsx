import { type ReactNode } from "react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen max-w-screen bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100 transition-colors duration-500">
      <section className="grid grid-flow-row min-h-screen xl:w-[1300px] px-5 md:px-10 lg:m-auto">
        <Header />
        {children}
      <Footer />
      </section>
    </div>
  );
}
