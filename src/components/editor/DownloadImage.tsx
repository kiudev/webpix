import { FilePondFile } from "filepond";

interface DownloadImageProps {
  fileData: string[];
  params: {
    width: number;
    height: number;
    quality: number;
  };
  files: FilePondFile[];
}

export const handleDownload = ({
  fileData,
  params,
  files,
}: DownloadImageProps) => {
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
    tempCanvas.height = Math.max(1, Math.floor(params.height * qualityFactor));
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
          console.log("Downloaded image size:", fileSizeInMB.toFixed(2), "MB");

          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = `${files[0].file.name.split(".")[0]}.webp`;
          link.click();
          URL.revokeObjectURL(link.href);
        }
      },
      "image/webp",
      params.quality / 100
    );
  };

  img.src = fileData[0];
};
