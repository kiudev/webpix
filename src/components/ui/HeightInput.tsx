import { handleDimensionChange } from "../editor/DimensionChange";

interface HeightInputProps {
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
}

export default function HeightInput({
  params,
  aspectRatio,
  setParams,
}: HeightInputProps) {
  return (
    <section className="flex flex-col gap-2 w-full">
      <label className="text-md" htmlFor="height">Height</label>
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
  );
}
