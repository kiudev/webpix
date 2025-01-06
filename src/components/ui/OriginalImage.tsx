interface OriginalImageProps {
  originalFileInKB: number;
  originalFileInMB: number;
  originalCanvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export default function OriginalImage({ originalFileInKB, originalFileInMB, originalCanvasRef }: OriginalImageProps ) {
  return (
    <div className="w-[50%] border-r flex flex-col">
      <div className="flex flex-row fixed top-0 px-5 py-2 bg-color-200">
        {originalFileInKB > 1024 ? (
          <p className="text-3xl text-center">
            {originalFileInMB.toFixed(2) + " MB"}
          </p>
        ) : (
          <p className="text-3xl text-center">
            {originalFileInKB.toFixed(2) + " KB"}
          </p>
        )}
      </div>
      <canvas ref={originalCanvasRef} className="w-full h-screen object-cover cursor-move" />
    </div>
  );
}
