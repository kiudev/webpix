import { FilePond } from "react-filepond";
import { FilePondFile, FilePondInitialFile } from "filepond";
import "filepond/dist/filepond.min.css";
import "./dropzone-styles.css";
import { useFileContext } from "@/context/FileContext";

export const Dropzone = () => {
  const { files, setFiles, handleSubmit, setParams } = useFileContext();

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
        allowMultiple={false}
        dropOnPage={true}
        dropOnElement={false}
        onupdatefiles={(fileItems: FilePondFile[]) => {
          setFiles(fileItems);

          fileItems.forEach((fileItem) => {
            const file = fileItem.file;

            if (file.type.startsWith("image/")) {
              const img = new Image();

              img.onload = () => {
                const width = img.width;
                const height = img.height;
                setParams({ width, height, quality: 75 })
              }
              img.src = URL.createObjectURL(file);
            }
          })
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
