import { FilePond, registerPlugin } from "react-filepond";
import { FilePondFile, FilePondInitialFile } from "filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "./dropzone-styles.css";
import 'filepond/dist/filepond.min.css'
import { useFileContext } from "@/context/FileContext";
import { iconFile } from "@/assets/icons";

registerPlugin(FilePondPluginImagePreview);

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
    <form
      className="flex flex-col justify-center w-[50%] mt-5"
      onSubmit={handleSubmit}
    >
      <FilePond
        files={convertedFiles}
        allowMultiple={false}
        dropOnPage={true}
        allowImagePreview={true}
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
                setParams({ width, height, quality: 75 });
              };
              img.src = URL.createObjectURL(file);
            }
          });
        }}
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        stylePanelLayout={"compact"}
      />
      {files.length > 0 && (
        <button
          type="submit"
          className="text-primary-500 m-auto sticky cursor-pointer mt-4 text-md rounded-[5px] animate-(--bounce-in)"
        >
          {iconFile.arrowRight}
        </button>
      )}
    </form>
  );
};
