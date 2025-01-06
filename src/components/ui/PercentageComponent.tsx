import { iconFile } from "@/assets/icons";

interface PercentageComponentProps {
  compressionPercentage: number;
  fileSizeInKB: number | null;
  originalFileInKB: number;
}

export default function PercentageComponent({ compressionPercentage, fileSizeInKB, originalFileInKB }: PercentageComponentProps) {
  return (
    <>
    <p className="text-3xl bg-color-200 flex items-center pl-10">
          {compressionPercentage + " %"}
          {fileSizeInKB !== null && fileSizeInKB > originalFileInKB ? (
            <>{iconFile.arrowNarrowUpIcon}</>
          ) : (
            <>{iconFile.arrowNarrowDownIcon}</>
          )}
        </p>

        <div className="w-0 h-0 border-t-[40px] border-b-[40px] border-l-[40px] border-transparent border-l-color-200 border flex flex-row items-center gap-5 relative"></div>
    </>
  )
}
