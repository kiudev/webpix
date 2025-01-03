import { useState, useEffect, useRef } from "react";
import type { LoaderFunction } from "react-router";
import Layout from "@/components/layout/Layout";
import { useFileContext } from "@/context/FileContext";

type Params = {
  width: number;
  height: number;
  quality: number;
  scale: number;
};

export const Loader: LoaderFunction = async () => {
  return {};
};

export default function Editor() {
  const [params, setParams] = useState<Params>({
    width: 800,
    height: 600,
    quality: 70,
    scale: 50,
  });

  const { files } = useFileContext();

  const [fileData, setFileData] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const files = sessionStorage.getItem("files");

    if (files) {
      setFileData(JSON.parse(files));
    }
  }, []);

  useEffect(() => {
    if (!fileData || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      const scaleFactor = params.scale / 100;
      canvas.width = params.width * scaleFactor;
      canvas.height = params.height * scaleFactor;

      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    img.src = fileData[0];
  }, [fileData, params]);

  const handleDownload = () => {
    if (!fileData) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      const scaleFactor = params.scale / 100;
      canvas.width = params.width * scaleFactor;
      canvas.height = params.height * scaleFactor;

      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/jpeg", params.quality / 100);
      link.download = `${files[0].file.name.split(".")[0]}.webp`;
      link.click();
    };

    img.src = fileData[0];
  };

  return (
    <Layout>
      <article className="flex flex-row-reverse justify-between gap-20">
        <section className="flex flex-col gap-10 w-[50%]">
          <section className="flex flex-row gap-5">
            {Object.entries(params)
              .slice(0, 2)
              .map(([key, value]) => {
                return (
                  <div key={key} className="flex flex-col gap-2">
                    <label className="text-lg" htmlFor={key}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                    <input
                      className="bg-color-300 text-color-100 outline-none text-md indent-2 p-1 rounded-md"
                      min={0}
                      type="number"
                      value={value}
                      onChange={(e) =>
                        setParams({ ...params, [key]: Number(e.target.value) })
                      }
                    />
                  </div>
                );
              })}
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
        <button onClick={handleDownload}>Download Optimized Image</button>
        </section>
        {/* {fileData && (
        <img
          src={image as string}
          alt="Selected"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      )}  */}
        <div className="w-[50%]">
          {/* {fileData.map((file, index) => (
            <img
              className='object-cover'
              width={params.width * params.scale}
              height={params.height * params.scale}
              key={index}
              src={file}
              alt="Selected"
            />
          ))} */}
          {fileData && (
            <>
              <canvas ref={canvasRef} className={`w-full h-full object-cover`} />
            </>
          )}
        </div>
      </article>
    </Layout>
  );
}
