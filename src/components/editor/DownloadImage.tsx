import { FilePondFile } from "filepond";
import { MouseEvent } from "react";

interface DownloadImageProps {
    fileData: string[];
    params: {
        width: number;
        height: number;
        quality: number;
    };
    files: FilePondFile[];
}

export const handleDownload = (e: MouseEvent<HTMLButtonElement>, { fileData, params, files }: DownloadImageProps) => {
    if (!fileData) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = params.width;
      canvas.height = params.height;

      const qualityFactor = params.quality / 100;
      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");
      tempCanvas.width = Math.max(1, Math.floor(params.width * qualityFactor));
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
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/jpeg");
      link.download = `${files[0].file.name.split(".")[0]}.webp`;
      link.click();
    };

    img.src = fileData[0];
}
