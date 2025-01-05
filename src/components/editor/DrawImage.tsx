import { useEffect } from "react";

interface DrawImageProps {
  fileData: string[];
  params: {
    width: number;
    height: number;
    quality: number;
  };
  originalCanvasRef: React.RefObject<HTMLCanvasElement | null>;
  editedCanvasRef: React.RefObject<HTMLCanvasElement | null>;
  setAspectRatio: React.Dispatch<React.SetStateAction<number | null>>;
}

export const DrawImage = ({ fileData, params, originalCanvasRef, editedCanvasRef, setAspectRatio }: DrawImageProps) => {
  useEffect(() => {
    const drawOriginalImage = () => {
      if (!fileData || !originalCanvasRef.current) return;

      const canvas = originalCanvasRef.current;
      const ctx = canvas?.getContext("2d");
      const img = new Image();

      img.onload = () => {
        canvas.width = 1000;
        canvas.height = 800;
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
        console.log('tempCanvas', tempCanvas.width, tempCanvas.height);
        console.log('Canvas', canvas.width, canvas.height);
      };
      img.src = fileData[0];
    };

    drawOriginalImage();
    drawEditedImage();
  }, [fileData, params]);
}
