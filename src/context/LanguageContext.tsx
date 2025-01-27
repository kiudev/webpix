import { createContext, useContext, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import "../i18n.config";
import { TFunction } from "i18next";
import { useState } from "react";

export const LanguageContext = createContext<
  | {
      t: TFunction;
      handleChangeLanguage: (lng: string) => void;
      animate: boolean;
    }
  | undefined
>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { t, i18n } = useTranslation();
  const [animate, setAnimate] = useState<boolean>(false);

  const handleChangeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setAnimate(true);

    setTimeout(() => {
      setAnimate(false);
    }, 500);
  };

  const values = {
    t,
    handleChangeLanguage,
    animate,
  };

  return <LanguageContext value={values}>{children}</LanguageContext>;
}

export function useLanguageContext() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguageContext must be used within a LanguageProvider"
    );
  }

  return context;
}
