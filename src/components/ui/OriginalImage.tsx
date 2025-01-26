import { useState, useRef, useEffect } from "react";
import useMoveImage from "../../hooks/useMoveImage";
import "ldrs/dotPulse";
import { useFileContext } from "@/context/FileContext";

interface OriginalImageProps {
  originalFileInKB: number;
  originalFileInMB: number;
  originalCanvasRef: React.RefObject<HTMLCanvasElement | null>;
  isMovingBoth: boolean;
  zoom: number;
  handleMouseWheel: (e: React.WheelEvent<HTMLCanvasElement>) => void;
}

export default function OriginalImage({
  originalFileInKB,
  originalFileInMB,
  originalCanvasRef,
  isMovingBoth,
  zoom,
  handleMouseWheel
}: OriginalImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const startPositionRef = useRef({ x: 0, y: 0 });

  const { equalPosition, setEqualPosition } = useFileContext();

  const { handleMouseDown } = useMoveImage({
    startPositionRef,
    imagePosition,
    setImagePosition,
    isDragging,
    setIsDragging,
  });



  useEffect(() => {
    if (originalFileInKB !== null || originalFileInMB !== null) {
      setIsLoading(false);
      if (isMovingBoth) {
        setEqualPosition(imagePosition);
      }
    }
  }, [
    originalFileInKB,
    originalFileInMB,
    imagePosition,
    setEqualPosition,
    isMovingBoth,
  ]);

  return (
    <div className="w-[50%] border-r flex flex-col justify-center">
      <div className="flex flex-row fixed top-0 px-5 py-2 dark:bg-neutral-900 dark:text-neutral-100 border-r-2 border-b-2 border-neutral-100/20 rounded-br-2xl">
        {!isLoading ? (
          <>
            {originalFileInKB > 1024 ? (
              <p className="text-2xl text-center">
                {originalFileInMB.toFixed(2) + " MB"}
              </p>
            ) : (
              <p className="text-2xl text-center">
                {originalFileInKB.toFixed(2) + " KB"}
              </p>
            )}
          </>
        ) : (
          <l-dot-pulse size="43" speed="1.3" color="#E1E7E9"></l-dot-pulse>
        )}
      </div>
      <canvas
        style={{
          objectPosition: isMovingBoth
            ? `${equalPosition.x}px ${equalPosition.y}px`
            : `${imagePosition.x}px ${imagePosition.y}px`,
          zoom: zoom
        }}
        onWheel={handleMouseWheel}
        onMouseDown={handleMouseDown}
        ref={originalCanvasRef}
        className={`w-full min-h-screen object-cover ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      />
    </div>
  );
}
