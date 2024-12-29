
import { createContext, type ReactNode, useState, type FormEvent, useContext } from "react";
// import { useNavigateWithTransition } from "@/hooks/useNavigateWithTransition";
import { FilePondFile } from "filepond";

interface FileContextType {
  files: FilePondFile[];
  setFiles: React.Dispatch<React.SetStateAction<FilePondFile[]>>;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}

export const FileContext = createContext<FileContextType>({
  files: [],
  setFiles: () => {},
  handleSubmit: async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    return Promise.resolve();
  }
})

export function FileProvider({ children }: { children: ReactNode }) {
  const [files, setFiles] = useState<FilePondFile[]>([])
  // const navigate = useNavigateWithTransition();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (files.length > 0) {
      const fileDataPromises = files.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event: ProgressEvent<FileReader>) => {
            if (event.target && typeof event.target.result === 'string') {
              resolve(event.target.result);
            } else {
              reject(new Error('Failed to read file'));
            }
          }

          reader.onerror = () => {
            console.error('Error reading file:', file)
          }

          reader.readAsDataURL(file.file);
        })
      })

      try {
        const fileData = await Promise.all(fileDataPromises);
        console.log('File data:', fileData);
        sessionStorage.setItem('files', JSON.stringify(fileData));
        // navigate("/editor");
      } catch (error) {
        console.error('Error processing files:', error);
      }
    }
  };

  const values = {
    files,
    setFiles,
    handleSubmit
  }

  return (
    <FileContext.Provider value={values}>
      {children}
    </FileContext.Provider>
  );
}

export function useFileContext() {
  const context = useContext(FileContext);

  if (!context) {
    throw new Error("ImageContext is not provided");
  }

  return context;
}
