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
      className="pl-24 pr-8 py-4 fixed bottom-10 border-t-2 border-b-2 border-r-2 right-14 hover:scale-90 transition-scale duration-500"
      onClick={() => handleDownload({ fileData, params, files })}
    >
      {iconFile.downloadIcon}
    </button>
  );
}
