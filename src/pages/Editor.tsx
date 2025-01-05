import { useState, useEffect, useRef } from "react";
import type { LoaderFunction } from "react-router";
import Layout from "@/components/layout/Layout";
import { useFileContext } from "@/context/FileContext";
import { DrawImage } from "@/components/editor/DrawImage";
import { handleDownload } from "@/components/editor/DownloadImage";
import { handleDimensionChange } from "@/components/editor/DimensionChange";

type Params = {
  width: number;
  height: number;
  quality: number;
};

export const Loader: LoaderFunction = async () => {
  return {};
};

export default function Editor() {
  const [params, setParams] = useState<Params>({
    width: 800,
    height: 600,
    quality: 70,
  });

  const { files } = useFileContext();

  const [fileData, setFileData] = useState<string[]>([]);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const originalCanvasRef = useRef<HTMLCanvasElement>(null);
  const editedCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const files = sessionStorage.getItem("files");

    if (files) {
      setFileData(JSON.parse(files));
    }
  }, []);

  DrawImage({ fileData, params, originalCanvasRef, editedCanvasRef, setAspectRatio });

  return (
    <Layout>
      <article className="flex flex-row-reverse justify-between gap-20">
        <section className="flex flex-col gap-10 w-[50%]">
          <section className="flex flex-row gap-5">
            <label className="text-lg" htmlFor="width">
              Width
            </label>
            <input
              className="bg-color-300 text-color-100 outline-none text-md indent-2 p-1 rounded-md"
              type="number"
              name="width"
              value={params.width}
              onChange={(e) =>
                handleDimensionChange("width", Number(e.target.value), {aspectRatio, params, setParams})
              }
            />
            <label htmlFor="height">Height</label>
            <input
              className="bg-color-300 text-color-100 outline-none text-md indent-2 p-1 rounded-md"
              type="number"
              name="height"
              value={params.height}
              onChange={(e) =>
                handleDimensionChange("height", Number(e.target.value), { aspectRatio, params, setParams })
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
          <button onClick={(e) => handleDownload(e, {fileData, params, files})}>Download Optimized Image</button>
        </section>
        <div className="w-[50%]">
          {fileData && (
            <div className="flex flex-col gap-10 border">
              <canvas ref={originalCanvasRef} className="w-full h-full" />
              <canvas ref={editedCanvasRef} className="w-full h-full"></canvas>
            </div>
          )}
        </div>
      </article>
    </Layout>
  );
}
