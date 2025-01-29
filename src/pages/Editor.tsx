import { useState, useEffect, useRef } from "react";
import type { LoaderFunction } from "react-router";
import { useFileContext } from "@/context/FileContext";
import { DrawImage } from "@/components/editor/DrawImage";
import QualityInput from "@/components/ui/QualityInput";
import OriginalImage from "@/components/ui/OriginalImage";
import EditedImage from "@/components/ui/EditedImage";
import DownloadButton from "@/components/ui/DownloadButton";
import PercentageComponent from "@/components/ui/PercentageComponent";
import { iconFile } from "@/assets/icons";
import DimensionInput from "@/components/ui/DimensionInput";
import { useNavigateWithTransition } from "@/hooks/useNavigateWithTransition";

export const Loader: LoaderFunction = async () => {
  return {};
};

export default function Editor() {
  const [fileData, setFileData] = useState<string[]>([]);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const [fileSizeInMB, setFileSizeInMB] = useState<number | null>(null);
  const [fileSizeInKB, setFileSizeInKB] = useState<number | null>(null);
  const [isMovingBoth, setIsMovingBoth] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isVisible, setIsVisible] = useState(true);
  const originalCanvasRef = useRef<HTMLCanvasElement>(null);
  const editedCanvasRef = useRef<HTMLCanvasElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const buttonSettingsRef = useRef<HTMLButtonElement>(null);

  const { files, params, setParams } = useFileContext();
  const { file } = files[0];
  const originalFileInMB = file.size / (1024 * 1024);
  const originalFileInKB = file.size / 1024;

  const navigate = useNavigateWithTransition();

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

  const handleMoveBothImages = () => {
    if (!isMovingBoth) {
      setIsMovingBoth(true);
    } else {
      setIsMovingBoth(false);
    }
  };

  const handleMouseWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    setZoom(zoom + e.deltaY * -0.001);
  };

  const handleSettingsClick = () => {
    if (isVisible) {
      settingsRef.current?.classList.remove("animate-(--slide-right)");
      settingsRef.current?.classList.add("animate-(--slide-left)");
      buttonSettingsRef.current?.classList.add(
        "animate-(--slide-out-left-button)"
      );

      setTimeout(() => {
        setIsVisible(false);
      }, 500);
    } else {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <main className="flex flex-col w-full gap-20 min-h-screen max-w-screen bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100 transition-colors duration-500">
      <button className="absolute right-5 top-5 bg-primary-500 text-neutral-900 cursor-pointer p-3 rounded-full" onClick={() => navigate("/")}>{iconFile.closeButton}</button>
      <button
        ref={buttonSettingsRef}
        onClick={handleSettingsClick}
        className={`absolute bottom-[220px] left-0 bg-primary-500 text-neutral-900 z-1 cursor-pointer ${
          isVisible ? "animate-(--slide-in-left-button)" : ""
        }`}
      >
        {isVisible ? iconFile.chevronsLeft : iconFile.chevronsRight}
      </button>
      {isVisible && (
        <section
          ref={settingsRef}
          className="flex flex-col w-96 gap-5 fixed left-0 right-0 bottom-0 text-neutral-600 bg-neutral-100 dark:bg-neutral-900 p-10 animate-(--slide-right) border-neutral-900/20 dark:border-neutral-100/20 border-t-2 border-r-2"
        >
          <DimensionInput
            name="width"
            value={params.width}
            params={params}
            setParams={setParams}
            aspectRatio={aspectRatio}
          />

          <DimensionInput
            name="height"
            value={params.height}
            params={params}
            setParams={setParams}
            aspectRatio={aspectRatio}
          />

          <QualityInput params={params} setParams={setParams} />
        </section>
      )}
      <div className="flex flex-row min-h-screen">
        <div>
          <button
            className={`absolute cursor-pointer inset-0 w-10 h-10 m-auto rounded-lg px-2 hover:rotate-12 hover:scale-125 transition-all ${
              isMovingBoth
                ? "bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-primary-500"
                : "bg-primary-500 text-neutral-900"
            }`}
            onClick={handleMoveBothImages}
          >
            {iconFile.moveBoth}
          </button>
        </div>
        {fileData && (
          <>
            <OriginalImage
              originalFileInKB={originalFileInKB}
              originalFileInMB={originalFileInMB}
              originalCanvasRef={originalCanvasRef}
              isMovingBoth={isMovingBoth}
              zoom={zoom}
              handleMouseWheel={handleMouseWheel}
            />

            <EditedImage
              editedCanvasRef={editedCanvasRef}
              fileSizeInKB={fileSizeInKB}
              fileSizeInMB={fileSizeInMB}
              isMovingBoth={isMovingBoth}
              zoom={zoom}
              handleMouseWheel={handleMouseWheel}
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
    </main>
  );
}
