import { iconFile } from "@/assets/icons";
import { handleDownload } from "../editor/DownloadImage";
import { FilePondFile } from "filepond";

interface DownloadButtonProps {
  fileData: string[];
  params: {
    width: number;
    height: number;
    quality: number;
  };
  files: FilePondFile[];
}

export default function DownloadButton({ fileData, params, files }: DownloadButtonProps) {
  return (
    <button
      className="lg:pl-24 lg:pr-8 lg:py-4 fixed bottom-10 border-2 p-2 right-4 lg:right-14 hover:scale-90 transition-scale duration-500 cursor-pointer bg-neutral-100 border-neutral-900/20 text-neutral-900 dark:bg-neutral-900 dark:border-neutral-100/20 dark:text-neutral-100 rounded-full"
      onClick={() => handleDownload({ fileData, params, files })}
    >
      {iconFile.downloadIcon}
    </button>
  );
}
