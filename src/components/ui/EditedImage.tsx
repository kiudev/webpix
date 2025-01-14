import { useEffect, useState, useCallback, useRef } from "react";
import "ldrs/dotPulse";
import useMoveImage from "../../hooks/useMoveImage";

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
}

export default function EditedImage({
  editedCanvasRef,
  fileSizeInKB,
  fileSizeInMB,
}: EditedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const startPositionRef = useRef({ x: 0, y: 0 });

  const handleMouseWheel = useCallback(
    (e: React.WheelEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      setZoom(zoom + e.deltaY / 100);
      console.log(zoom);
    },
    [zoom]
  );

  const { handleMouseDown } =
    useMoveImage({
      startPositionRef,
      position,
      setPosition,
      isDragging,
      setIsDragging,
    });

  useEffect(() => {
    if (fileSizeInKB !== null || fileSizeInMB !== null) {
      setIsLoading(false);
    }
  }, [fileSizeInKB, fileSizeInMB]);

  return (
    <div className="w-[50%] border-l">
      <div className="flex flex-row fixed top-0 px-5 py-2 bg-color-200">
        {!isLoading ? (
          <>
            {fileSizeInKB !== null && fileSizeInKB > 1024 ? (
              <p className="text-3xl text-center">{fileSizeInMB + " MB"}</p>
            ) : (
              <p className="text-3xl text-center">{fileSizeInKB + " KB"}</p>
            )}
          </>
        ) : (
          <l-dot-pulse size="43" speed="1.3" color="#E1E7E9"></l-dot-pulse>
        )}
      </div>
      <canvas
        style={{ objectPosition: `${position.x}px ${position.y}px` }}
        onMouseDown={handleMouseDown}
        onWheel={handleMouseWheel}
        ref={editedCanvasRef}
        className={`w-full h-screen object-cover ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        } `}
      />
    </div>
  );
}
