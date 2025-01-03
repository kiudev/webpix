import { type ReactNode } from "react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen max-w-screen bg-color-300 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(13,19,21,0.2),rgba(255,255,255,0))] text-color-100 dark:bg-color-100 dark:text-color-300 dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(225,231,233,0.2),rgba(255,255,255,0))] transition-colors duration-500">
      <section className="grid grid-flow-row min-h-screen lg:w-[1300px] lg:m-auto">
        <Header />
        {children}
      <Footer />
      </section>
    </div>
  );
}
