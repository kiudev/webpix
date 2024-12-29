
import { createContext, type ReactNode, useState, useContext } from "react";
import { FilePondFile } from "filepond";

interface FileContextType {
  files: FilePondFile[];
  setFiles: React.Dispatch<React.SetStateAction<FilePondFile[]>>;
}

export const FileContext = createContext<FileContextType>({
  files: [],
  setFiles: () => {},
})

export function FileProvider({ children }: { children: ReactNode }) {
  const [files, setFiles] = useState<FilePondFile[]>([])



  const values = {
    files,
    setFiles,
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
