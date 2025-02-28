import { useLanguageContext } from "@/context/LanguageContext";

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
  const { t } = useLanguageContext();

  return (
    <section className="flex flex-col justify-between gap-5">
      <label className="text-md flex items-center justify-between !text-primary-600 dark:!text-primary-500 font-semibold" htmlFor="quality">
        {t("quality")}
        <p className="text-center text-md">{params.quality + "%"}</p>
      </label>
      <input
        className="accent-primary-600 dark:accent-primary-500 rounded-md w-full"
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
