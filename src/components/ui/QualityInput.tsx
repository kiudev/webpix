interface QualityInputProps {
  params: {
    width: number;
    height: number;
    quality: number;
  };
  setParams: React.Dispatch<
    React.SetStateAction<{
      width: number;
      height: number;
      quality: number;
    }>
  >;
}

export default function QualityInput({
  params,
  setParams,
}: QualityInputProps) {
  return (
    <section className="flex flex-col gap-2 w-full">
      <label className="text-md" htmlFor="quality">
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
    </section>
  );
}
