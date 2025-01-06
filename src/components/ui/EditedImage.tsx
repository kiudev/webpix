interface EditedImageProps {
  editedCanvasRef: React.RefObject<HTMLCanvasElement | null>;
  fileSizeInKB: number | null;
  fileSizeInMB: number | null;
}

export default function EditedImage({  editedCanvasRef, fileSizeInKB, fileSizeInMB }: EditedImageProps) {
  return (
    <div className="w-[50%] border-l">
      <div className="flex flex-row fixed top-0 px-5 py-2 bg-color-200">
        {fileSizeInKB !== null && fileSizeInKB > 1024 ? (
          <p className="text-3xl text-center">{fileSizeInMB + " MB"}</p>
        ) : (
          <p className="text-3xl text-center">{fileSizeInKB + " KB"}</p>
        )}
      </div>
      <canvas ref={editedCanvasRef} className="w-full h-screen object-cover cursor-move" />
    </div>
  );
}
