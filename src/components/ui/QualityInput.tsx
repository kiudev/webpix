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
    <section className="flex flex-col justify-between gap-5">
      <label className="text-md flex items-center justify-between !text-neutral-900 dark:!text-primary-500 font-semibold" htmlFor="quality">
        Quality
        <p className="text-center text-md">{params.quality + "%"}</p>
      </label>
      <input
        className="accent-primary-100 rounded-md w-full"
        type="range"
        value={params.quality}
        min={1}
        max={100}
        onChange={(e) =>
          setParams({ ...params, quality: Number(e.target.value) })
        }
      />
    </section>
  );
}
