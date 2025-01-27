import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

i18next.use(initReactI18next).use(LanguageDetector).init({
  resources: {
    en: {
      translation: {
        "Compress your image to": "Compress your image to",
        "Optimize your web applications better":
          "Optimize your web applications better",
        "Drag & Drop your files or Browse": "Drag & Drop or browse your files",
        "width": "Width",
        "height": "Height",
        "quality": "Quality",
      },
    },
    es: {
      translation: {
        "Compress your image to": "Comprime tu imagen a",
        "Optimize your web applications better":
          "Optimiza tus aplicaciones mejor",
        "Drag & Drop your files or Browse": "Arrastra y suelta o busca tus archivos",
        "width": "Ancho",
        "height": "Altura",
        "quality": "Calidad",
      },
    },
  },
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});
