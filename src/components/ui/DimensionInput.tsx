import React from "react";
import { handleDimensionChange } from "../editor/DimensionChange";
import { useLanguageContext } from "@/context/LanguageContext";

interface DimensionInputProps {
  params: {
    width: number;
    height: number;
    quality: number;
  };
  aspectRatio: number | null;
  setParams: React.Dispatch<
    React.SetStateAction<{
      width: number;
      height: number;
      quality: number;
    }>
  >;
  name: "width" | "height";
  value: number;
}

export default function DimensionInput({
  params,
  aspectRatio,
  setParams,
  name,
  value,
}: DimensionInputProps) {
  const { t } = useLanguageContext();

  return (
    <section className="flex flex-row items-center justify-between gap-2">
      <label className="text-md capitalize !text-primary-500 font-semibold" htmlFor={name}>
        {t(name)}
      </label>
      <input
        className=" text-neutral-100 border-2 border-neutral-100/20 outline-none text-md indent-2 p-1 rounded-md"
        type="number"
        name={name}
        value={value}
        onChange={(e) =>
          handleDimensionChange(name, Number(e.target.value), {
            aspectRatio,
            params,
            setParams,
          })
        }
      />
    </section>
  );
}
