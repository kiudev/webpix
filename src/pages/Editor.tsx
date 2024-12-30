import { useState, useEffect } from "react";
import type { LoaderFunction } from "react-router";
import Layout from "@/components/layout/Layout";

export const Loader: LoaderFunction = async () => {
  return {};
};

export default function Editor() {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [quality, setQuality] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);
  const [fileData, setFileData] = useState<string[]>([]);

  useEffect(() => {
    const files = sessionStorage.getItem('files');

    if (files) {
      setFileData(JSON.parse(files));
    }
  }, [])

  // const handleDownload = () => {
  //   if (!fileData) return;

  //   const canvas = document.createElement("canvas");
  //   const ctx = canvas.getContext("2d");
  //   const img = new Image();

  //   img.onload = () => {
  //     canvas.width = width * scale;
  //     canvas.height = height * scale;
  //     ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
  //     const link = document.createElement("a");
  //     link.href = canvas.toDataURL("image/jpeg", quality);
  //     link.download = "optimized-image.jpg";
  //     link.click();
  //   };

  //   img.src = image as string;
  // };

  return (
    <Layout>
      <section className="flex flex-row-reverse justify-between">

      <div className="flex flex-col">
        <label>
          Width:
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
          />
        </label>


        <label>
          Height:
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
          />
        </label>


        <label>
          Quality:
          <input
            type="number"
            step="0.1"
            min="0"
            max="1"
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
          />
        </label>


        <label>
          Scale:
          <input
            type="number"
            step="0.1"
            min="0"
            value={scale}
            onChange={(e) => setScale(Number(e.target.value))}
          />
        </label>
      </div>
      {/* <button onClick={handleDownload}>Download Optimized Image</button>
      {fileData && (
        <img
          src={image as string}
          alt="Selected"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      )} */}
      {fileData.map((file, index) => (
        <img
          key={index}
          src={file}
          alt="Selected"
          style={{ maxWidth: "50%", maxHeight: "50%" }}
        />
      ))}
      </section>
    </Layout>
  );
}
