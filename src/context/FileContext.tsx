import {
  createContext,
  type ReactNode,
  useState,
  useContext,
  type FormEvent,
} from "react";
import { FilePondFile } from "filepond";
import { useNavigateWithTransition } from "@/hooks/useNavigateWithTransition";

interface FileContextType {
  files: FilePondFile[];
  setFiles: React.Dispatch<React.SetStateAction<FilePondFile[]>>;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isAuthenticated: boolean;
}

export const FileContext = createContext<FileContextType>({
  files: [],
  setFiles: () => {},
  handleSubmit: () => {},
  isAuthenticated: false,
});

export function FileProvider({ children }: { children: ReactNode }) {
  const [files, setFiles] = useState<FilePondFile[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigateWithTransition();

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
        sessionStorage.setItem("files", JSON.stringify(fileData));
        setIsAuthenticated(true);
        navigate("/editor");
      } catch (error) {
        console.error("Error processing files:", error);
      }
    }
  };

  const values = {
    files,
    setFiles,
    handleSubmit,
    isAuthenticated,
  };

  return <FileContext.Provider value={values}>{children}</FileContext.Provider>;
}

export function useFileContext() {
  const context = useContext(FileContext);

  if (!context) {
    throw new Error("ImageContext is not provided");
  }

  return context;
}
