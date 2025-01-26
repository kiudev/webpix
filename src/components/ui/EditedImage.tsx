import { useEffect, useState, useRef } from "react";
import "ldrs/dotPulse";
import useMoveImage from "../../hooks/useMoveImage";
import { useFileContext } from "@/context/FileContext";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "l-dot-pulse": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        size?: string;
        speed?: string;
        color?: string;
      };
    }
  }
}

interface EditedImageProps {
  editedCanvasRef: React.RefObject<HTMLCanvasElement | null>;
  fileSizeInKB: number | null;
  fileSizeInMB: number | null;
  isMovingBoth: boolean;
  zoom: number;
  handleMouseWheel: (e: React.WheelEvent<HTMLCanvasElement>) => void;
}

export default function EditedImage({
  editedCanvasRef,
  fileSizeInKB,
  fileSizeInMB,
  isMovingBoth,
  zoom,
  handleMouseWheel
}: EditedImageProps) {
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
    if (fileSizeInKB !== null || fileSizeInMB !== null) {
      setIsLoading(false);
      if (isMovingBoth) {
        setEqualPosition(imagePosition);
      }
    }
  }, [
    fileSizeInKB,
    fileSizeInMB,
    isMovingBoth,
    imagePosition,
    setEqualPosition,
  ]);

  return (
    <div className="w-[50%] border-l flex flex-col justify-center">
      <div className="flex flex-row fixed top-0 px-5 py-2 dark:bg-neutral-900 dark:text-neutral-100 border-r-2 border-b-2 border-neutral-100/20 backdrop-blur-xl rounded-br-2xl">
        {!isLoading ? (
          <>
            {fileSizeInKB !== null && fileSizeInKB > 1024 ? (
              <p className="text-2xl text-center">{fileSizeInMB + " MB"}</p>
            ) : (
              <p className="text-2xl text-center">{fileSizeInKB + " KB"}</p>
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
          zoom: zoom,
        }}
        onMouseDown={handleMouseDown}
        onWheel={handleMouseWheel}
        ref={editedCanvasRef}
        className={`w-full min-h-screen object-cover ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        } `}
      />
    </div>
  );
}
