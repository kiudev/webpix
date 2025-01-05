import { useState, useEffect, useRef } from "react";
import type { LoaderFunction } from "react-router";
import Layout from "@/components/layout/Layout";
import { useFileContext } from "@/context/FileContext";
import { DrawImage } from "@/components/editor/DrawImage";
import { handleDownload } from "@/components/editor/DownloadImage";
import { handleDimensionChange } from "@/components/editor/DimensionChange";

export const Loader: LoaderFunction = async () => {
  return {};
};

export default function Editor() {
  const { files, params, setParams } = useFileContext();
  const { file } = files[0];
  const originalFileInKB = file.size / 1024;
  const [fileData, setFileData] = useState<string[]>([]);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const [fileSizeInKB, setFileSizeInKB] = useState<number | null>(null);
  const originalCanvasRef = useRef<HTMLCanvasElement>(null);
  const editedCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const files = sessionStorage.getItem("files");

    if (files) {
      setFileData(JSON.parse(files));
    }
  }, []);

  DrawImage({ fileData, originalCanvasRef, editedCanvasRef, setAspectRatio, setFileSizeInKB });

  return (
    <Layout>
      <article className="flex flex-col-reverse w-full gap-20">
        <section className="flex flex-col gap-10 w-[50%]">
          <section className="flex flex-col gap-5">
            <label className="text-lg" htmlFor="width">
              Width
            </label>
            <input
              className="bg-color-300 text-color-100 outline-none text-md indent-2 p-1 rounded-md max-w-40"
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
              className="bg-color-300 text-color-100 outline-none text-md indent-2 p-1 rounded-md max-w-40"
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

          {Object.entries(params)
            .slice(2)
            .map(([key, value]) => {
              return (
                <div key={key} className="flex flex-col gap-2">
                  <label className="text-lg" htmlFor={key}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <input
                    className="accent-color-400 rounded-md"
                    type="range"
                    value={value}
                    min={1}
                    max={100}
                    onChange={(e) =>
                      setParams({ ...params, [key]: Number(e.target.value) })
                    }
                  />
                  <p>{value}</p>
                </div>
              );
            })}
          <button
            className="bg-color-200 px-8 py-2 w-60 rounded-md"
            onClick={(e) => handleDownload(e, { fileData, params, files })}
          >
            Download
          </button>
        </section>
        <div className="w-[500px] h-[500px] flex">
          {fileData && (
            <>
              <div className="w-[50%]">
              <canvas ref={originalCanvasRef} className="w-full h-full" />
              <p>{originalFileInKB.toFixed(2)}</p>
              </div>
              <div className="w-[50%]">
                <canvas ref={editedCanvasRef} className="w-full h-full" />
                <p>{fileSizeInKB}</p>
              </div>
            </>
          )}
        </div>
      </article>
    </Layout>
  );
}
