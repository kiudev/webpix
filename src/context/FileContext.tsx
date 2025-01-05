import {
  createContext,
  type ReactNode,
  useState,
  type FormEvent,
  useContext,
} from "react";
import { FilePondFile } from "filepond";
import { useNavigateWithTransition } from "@/hooks/useNavigateWithTransition";

type Params = {
  width: number;
  height: number;
  quality: number;
};

interface FileContextType {
  files: FilePondFile[];
  setFiles: React.Dispatch<React.SetStateAction<FilePondFile[]>>;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isAuthenticated: boolean;
  params: Params;
  setParams: React.Dispatch<React.SetStateAction<Params>>;
}

export const FileContext = createContext<FileContextType>({
  files: [],
  setFiles: () => {},
  handleSubmit: () => {},
  isAuthenticated: false,
  params: {
    width: 0,
    height: 0,
    quality: 75,
  },
  setParams: () => {}
});

export function FileProvider({ children }: { children: ReactNode }) {
  const [files, setFiles] = useState<FilePondFile[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigateWithTransition();
  const [params, setParams] = useState<Params>({
    width: 0,
    height: 0,
    quality: 75,
  });

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
    params,
    setParams
  };

  return <FileContext value={values}>{children}</FileContext>;
}

export function useFileContext() {
  const context = useContext(FileContext);

  if (!context) {
    throw new Error('useFileContext must be used within a FileProvider');
  }

  return context;
}
