import { useEffect, type FormEvent } from "react";
import { useState } from "react";

import { FilePond } from "react-filepond";
import { FilePondFile, FilePondInitialFile } from "filepond";
import "filepond/dist/filepond.min.css";
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import "./dropzone-styles.css";
import { useFileContext } from "@/context/FileContext";
import { useNavigateWithTransition } from "@/hooks/useNavigateWithTransition";

export const Dropzone = () => {
  const { files, setFiles } = useFileContext();
  const navigate = useNavigateWithTransition();
  const [isFileAdded, setIsFileAdded] = useState<boolean>(false);

  const convertedFiles: FilePondInitialFile[] = files.map((file) => ({
    source: file.file.name,
    options: {
      type: "local",
      file: file.file,
    },
  }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (files.length > 0) {
      const fileDataPromises = files.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event: ProgressEvent<FileReader>) => {
            if (event.target && typeof event.target.result === "string") {
              resolve(event.target.result);
            } else {
              reject(new Error("Failed to read file"));
            }
          };

          reader.onerror = () => {
            console.error("Error reading file:", file);
          };

          reader.readAsDataURL(file.file);
        });
      });

      try {
        const fileData = await Promise.all(fileDataPromises);
        console.log("File data:", fileData);
        sessionStorage.setItem("files", JSON.stringify(fileData));
        navigate("/editor");
      } catch (error) {
        console.error("Error processing files:", error);
      }
    }
  };

  useEffect(() => {
    if (isFileAdded) {
      setTimeout(() => {
        setIsFileAdded(false);
      }, 2000)
    }
  }, [isFileAdded])

  return (
    <form className="w-[50%] h-40" onSubmit={handleSubmit}>
      {isFileAdded && <div className="absolute top-0 min-w-full py-5 left-0 bg-color-200 flex justify-center items-center text-xl animate-slide">
        File added</div> }

      <FilePond
        files={convertedFiles}
        allowMultiple={true}
        dropOnPage={true}
        dropOnElement={false}
        onupdatefiles={(fileItems: FilePondFile[]) => {
          setFiles(fileItems);
        }}
        onaddfile={(error, file) => {
          if (error) {
            console.log("Error adding file:", file);
          } else {
            setIsFileAdded(true);
          }
        }}
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        stylePanelLayout={"compact"}
      />
      <button
        type="submit"
        className="bg-color-200 text-color-300 py-2 px-10 z-20 sticky float-right cursor-pointer mt-2 text-lg"
      >
        Start
      </button>
    </form>
  );
};
