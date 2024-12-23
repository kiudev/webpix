import { type ChangeEvent, createContext, type ReactNode, useState } from "react";
import { useNavigateWithTransition } from "~/hooks/useNavigateWithTransition";

interface ImageContextType {
  image: string | ArrayBuffer | null;
  setImage: (image: string | ArrayBuffer | null) => void;
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const ImageContext = createContext<ImageContextType>({
  image: null,
  setImage: () => {},
  handleImageChange: () => {}
})

export function ImageProvider({ children }: { children: ReactNode }) {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const navigate = useNavigateWithTransition();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      console.log('Reader:', reader);
      reader.onloadend = () => {
        setImage(reader.result as string);
        navigate("/editor");
      };
      reader.readAsDataURL(file);
    }
  };

  const values = {
    image,
    setImage,
    handleImageChange
  }

  return (
    <ImageContext.Provider value={values}>
      {children}
    </ImageContext.Provider>
  );
}


