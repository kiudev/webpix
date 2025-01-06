import { useEffect } from "react";
import { useFileContext } from "@/context/FileContext";

interface DrawImageProps {
  fileData: string[];
  originalCanvasRef: React.RefObject<HTMLCanvasElement | null>;
  editedCanvasRef: React.RefObject<HTMLCanvasElement | null>;
  setAspectRatio: React.Dispatch<React.SetStateAction<number | null>>;
  setFileSizeInMB: React.Dispatch<React.SetStateAction<number | null>>;
  setFileSizeInKB: React.Dispatch<React.SetStateAction<number | null>>;
}

export const DrawImage = ({
  fileData,
  originalCanvasRef,
  editedCanvasRef,
  setAspectRatio,
  setFileSizeInMB,
  setFileSizeInKB
}: DrawImageProps) => {
  const { params } = useFileContext();
  useEffect(() => {
    const drawOriginalImage = () => {
      if (!fileData || !originalCanvasRef.current) return;

      const canvas = originalCanvasRef.current;
      const ctx = canvas?.getContext("2d");
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        setAspectRatio(img.width / img.height);
        ctx?.drawImage(img, 0, 0, canvas?.width, canvas?.height);
      };
      img.src = fileData[0];
    };

    const drawEditedImage = () => {
      if (!fileData || !editedCanvasRef.current) return;

      const canvas = editedCanvasRef.current;
      const ctx = canvas?.getContext("2d");
      const img = new Image();

      img.onload = () => {
        canvas.width = params.width;
        canvas.height = params.height;

        const qualityFactor = params.quality / 100;
        const tempCanvas = document.createElement("canvas");
        const tempCtx = tempCanvas.getContext("2d");
        tempCanvas.width = Math.max(
          1,
          Math.floor(params.width * qualityFactor)
        );
        tempCanvas.height = Math.max(
          1,
          Math.floor(params.height * qualityFactor)
        );
        tempCtx?.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);
        ctx?.drawImage(
          tempCanvas,
          0,
          0,
          tempCanvas.width,
          tempCanvas.height,
          0,
          0,
          canvas.width,
          canvas.height
        );

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const fileSizeInMB = blob.size / (1024 * 1024);
              const fileSizeInKB = blob.size / 1024;
              setFileSizeInMB(Number(fileSizeInMB.toFixed(2)));
              setFileSizeInKB(Number(fileSizeInKB.toFixed(2)));
            }
          },
          "image/webp",
          params.quality / 100
        );
      };
      img.src = fileData[0];
    };

    drawOriginalImage();
    drawEditedImage();
  }, [fileData, params]);
};
