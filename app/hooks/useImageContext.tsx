import { useContext } from "react";
import { ImageContext } from "~/context/imageContext";

export function useImageContext() {
  const context = useContext(ImageContext);

  if (!context) {
    throw new Error("ImageContext is not provided");
  }

  return context;
}
