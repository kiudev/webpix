import { useState, useEffect, useRef } from "react";
import type { LoaderFunction } from "react-router";
import { useFileContext } from "@/context/FileContext";
import { DrawImage } from "@/components/editor/DrawImage";
import { handleDownload } from "@/components/editor/DownloadImage";
import { handleDimensionChange } from "@/components/editor/DimensionChange";
import { iconFile } from "@/assets/icons";

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
          <label className="text-lg" htmlFor="width">
            Width
          </label>
          <input
            className="bg-color-300 text-color-100 outline-none text-md indent-2 p-1 rounded-md "
            type="number"
            name="width"
            value={params.width}
            onChange={(e) =>
              handleDimensionChange("width", Number(e.target.value), {
                aspectRatio,
                params,
                setParams,
              })
            }
          />
          <label htmlFor="height">Height</label>
          <input
            className="bg-color-300 text-color-100 outline-none text-md indent-2 p-1 rounded-md "
            type="number"
            name="height"
            value={params.height}
            onChange={(e) =>
              handleDimensionChange("height", Number(e.target.value), {
                aspectRatio,
                params,
                setParams,
              })
            }
          />
        </section>

        <div className="flex flex-col gap-2 w-full">
          <label className="text-lg" htmlFor="quality">
            Quality
          </label>
          <input
            className="accent-color-400 rounded-md"
            type="range"
            value={params.quality}
            min={1}
            max={100}
            onChange={(e) =>
              setParams({ ...params, quality: Number(e.target.value) })
            }
          />
          <p>{params.quality}</p>
        </div>
      </section>
      <div className="flex flex-row">
        {fileData && (
          <>
            <div className="w-[50%] border-r flex flex-col">
              <div className="flex flex-row fixed top-0 px-5 py-2 bg-color-200">
                {originalFileInKB > 1024 ? (
                  <p className="text-3xl text-center">
                    {originalFileInMB.toFixed(2) + " MB"}
                  </p>
                ) : (
                  <p className="text-3xl text-center">
                    {originalFileInKB.toFixed(2) + " KB"}
                  </p>
                )}
              </div>
              <canvas ref={originalCanvasRef} className="w-full h-full" />
            </div>
            <div className="w-[50%] border-l">
              <div className="flex flex-row fixed top-0 px-5 py-2 bg-color-200">
                {fileSizeInKB !== null && fileSizeInKB > 1024 ? (
                  <p className="text-3xl text-center">{fileSizeInMB + " MB"}</p>
                ) : (
                  <p className="text-3xl text-center">{fileSizeInKB + " KB"}</p>
                )}
              </div>
              <canvas ref={editedCanvasRef} className="w-full h-full" />
            </div>
          </>
        )}
      </div>
      <button
        className="pl-24 pr-8 py-4 fixed bottom-10 border-t-2 border-b-2 border-r-2 right-14 hover:scale-90 transition-scale duration-500"
        onClick={() => handleDownload({ fileData, params, files })}
      >
        {iconFile.downloadIcon}
      </button>
      <div className="fixed bottom-10 right-36 flex flex-row">
        <p className="text-3xl bg-color-200 flex items-center pl-10">
          {compressionPercentage + " %"}
          {fileSizeInKB !== null && fileSizeInKB > originalFileInKB ? (
            <>{iconFile.arrowNarrowUpIcon}</>
          ) : (
            <>{iconFile.arrowNarrowDownIcon}</>
          )}
        </p>

        <div className="w-0 h-0 border-t-[40px] border-b-[40px] border-l-[40px] border-transparent border-l-color-200 border flex flex-row items-center gap-5 relative"></div>
      </div>
    </article>
  );
}
