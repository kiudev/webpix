import { iconFile } from "@/assets/icons";

interface PercentageComponentProps {
  compressionPercentage: number;
  fileSizeInKB: number | null;
  originalFileInKB: number;
}

export default function PercentageComponent({ compressionPercentage, fileSizeInKB, originalFileInKB }: PercentageComponentProps) {
  return (
    <>
    <p className="rounded-l-full lg:rounded-none text-2xl lg:text-3xl bg-primary-500 text-neutral-900 flex items-center pl-5 py-2 lg:pl-10">
          {compressionPercentage + " %"}
          {fileSizeInKB !== null && fileSizeInKB > originalFileInKB ? (
            <>{iconFile.arrowNarrowUpIcon}</>
          ) : (
            <>{iconFile.arrowNarrowDownIcon}</>
          )}
        </p>

        <div className="w-0 h-0 hidden border-t-[40px] border-b-[40px] border-l-[40px] border-transparent border-l-primary-500 border lg:flex flex-row items-center gap-5 relative"></div>
    </>
  )
}
