import React from "react";
import { handleDimensionChange } from "../editor/DimensionChange";

interface WidthInputProps {
  params: {
    width: number;
    height: number;
    quality: number;
  }
  aspectRatio: number | null;
  setParams: React.Dispatch<React.SetStateAction<{
    width: number;
    height: number;
    quality: number;
  }>>;
}

export default function WidthInput({ params, aspectRatio, setParams }: WidthInputProps) {
  return (
    <section className="flex flex-col gap-2 w-full">
      <label className="text-md" htmlFor="width">
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
    </section>
  );
}
