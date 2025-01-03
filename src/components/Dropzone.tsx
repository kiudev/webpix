import { FilePond } from "react-filepond";
import { FilePondFile, FilePondInitialFile } from "filepond";
import "filepond/dist/filepond.min.css";
import "./dropzone-styles.css";
import { useFileContext } from "@/context/FileContext";

export const Dropzone = () => {
  const { files, setFiles, handleSubmit } = useFileContext();

  const convertedFiles: FilePondInitialFile[] = files.map((file) => ({
    source: file.file.name,
    options: {
      type: "local",
      file: file.file,
    },
  }));

  return (
    <form className="w-[50%] h-40" onSubmit={handleSubmit}>
      <FilePond
        files={convertedFiles}
        allowMultiple={true}
        dropOnPage={true}
        dropOnElement={false}
        onupdatefiles={(fileItems: FilePondFile[]) => {
          setFiles(fileItems);
        }}
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        stylePanelLayout={"compact"}
      />
      <button
        type="submit"
        className="bg-color-200 text-color-300 py-1 px-10 sticky float-right cursor-pointer mt-4 text-md rounded-[5px]"
      >
        Start
      </button>
    </form>
  );
};
