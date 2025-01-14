import { useState, useEffect, useRef } from "react";
import type { LoaderFunction } from "react-router";
import { useFileContext } from "@/context/FileContext";
import { DrawImage } from "@/components/editor/DrawImage";
import WidthInput from "@/components/ui/WidthInput";
import HeightInput from "@/components/ui/HeightInput";
import QualityInput from "@/components/ui/QualityInput";
import OriginalImage from "@/components/ui/OriginalImage";
import EditedImage from "@/components/ui/EditedImage";
import DownloadButton from "@/components/ui/DownloadButton";
import PercentageComponent from "@/components/ui/PercentageComponent";

export const Loader: LoaderFunction = async () => {
  return {};
};

export default function Editor() {
  const [fileData, setFileData] = useState<string[]>([]);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const [fileSizeInMB, setFileSizeInMB] = useState<number | null>(null);
  const [fileSizeInKB, setFileSizeInKB] = useState<number | null>(null);
  const originalCanvasRef = useRef<HTMLCanvasElement>(null);
  const editedCanvasRef = useRef<HTMLCanvasElement>(null);

  const { files, params, setParams } = useFileContext();
  const { file } = files[0];
  const originalFileInMB = file.size / (1024 * 1024);
  const originalFileInKB = file.size / 1024;

  const compressionPercentage =
    fileSizeInKB !== null
      ? Math.min(
          100,
          Math.abs(
            Math.round(
              ((originalFileInKB - fileSizeInKB) / originalFileInKB) * 100
            )
          )
        )
      : 0;

  useEffect(() => {
    const files = sessionStorage.getItem("files");

    if (files) {
      setFileData(JSON.parse(files));
    }
  }, []);

  DrawImage({
    fileData,
    originalCanvasRef,
    editedCanvasRef,
    setAspectRatio,
    setFileSizeInMB,
    setFileSizeInKB,
  });

  return (
    <article className="flex flex-col w-full gap-20 min-h-screen max-w-screen bg-color-300 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(13,19,21,0.2),rgba(255,255,255,0))] text-color-100 dark:bg-color-100 dark:text-color-300 dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(225,231,233,0.2),rgba(255,255,255,0))] transition-colors duration-500">
      <section className="flex flex-col gap-10 w-[30%] fixed left-0 right-0 bottom-0 m-auto bg-color-200 rounded-t-2xl px-10 py-5 animate-fadeInUp">
        <section className="flex flex-row gap-2">
          <WidthInput
            params={params}
            aspectRatio={aspectRatio}
            setParams={setParams}
          />
          <HeightInput
            params={params}
            aspectRatio={aspectRatio}
            setParams={setParams}
          />
        </section>

        <div className="flex flex-col gap-2 w-full">
          <QualityInput params={params} setParams={setParams} />
        </div>
      </section>
      <div className="flex flex-row">
        {fileData && (
          <>
            <OriginalImage
              originalFileInKB={originalFileInKB}
              originalFileInMB={originalFileInMB}
              originalCanvasRef={originalCanvasRef}
            />

            <EditedImage
              editedCanvasRef={editedCanvasRef}
              fileSizeInKB={fileSizeInKB}
              fileSizeInMB={fileSizeInMB}
            />
          </>
        )}
      </div>
      <DownloadButton fileData={fileData} params={params} files={files} />
      <div className="fixed bottom-10 right-36 flex flex-row">
        <PercentageComponent
          compressionPercentage={compressionPercentage}
          fileSizeInKB={fileSizeInKB}
          originalFileInKB={originalFileInKB}
        />
      </div>
    </article>
  );
}
