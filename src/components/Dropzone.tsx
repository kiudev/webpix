import { FilePond } from "react-filepond";
import { FilePondFile, FilePondInitialFile } from "filepond";
import "filepond/dist/filepond.min.css";
// import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
// import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
// import FilePondPluginImagePreview from "filepond-plugin-image-preview";
// import FilePondPluginImageOverlay from 'filepond-plugin-image-overlay';
// import 'filepond-plugin-image-overlay/dist/filepond-plugin-image-overlay.css'
import "./dropzone-styles.css";
import { useFileContext } from "@/context/FileContext";


// registerPlugin(FilePondPluginImageExifOrientation);


export const Dropzone = () => {

  const { files, setFiles, handleSubmit } = useFileContext();
  console.log('Estado files', files);

  const convertedFiles: FilePondInitialFile[] = files.map((file) => ({
    source: file.file.name,
    options: {
      type: 'local',
      file: file.file
    }
  }))

  return (
    <form className='w-[50%] h-40 relative' onSubmit={handleSubmit}>
      <FilePond
        files={convertedFiles}
        allowMultiple={true}
        allowReorder={true}
        dropOnPage={true}
        dropOnElement={false}
        onupdatefiles={(fileItems: FilePondFile[]) => {
          setFiles(fileItems);
        }}
        onaddfilestart={(fileItem: FilePondFile) => {
          console.log('Cargando...', fileItem);
        }}
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        stylePanelLayout={'compact'}
      />
      <button type='submit' className='bg-color-200 text-color-300 py-4 px-8 cursor-pointer mt-10 w-40 text-xl'>Start</button>
    </form>
  )
}
