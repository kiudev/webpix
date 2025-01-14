import { useState, useRef, useEffect } from "react";
import useMoveImage from "../../hooks/useMoveImage";
import 'ldrs/dotPulse';

interface OriginalImageProps {
  originalFileInKB: number;
  originalFileInMB: number;
  originalCanvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export default function OriginalImage({
  originalFileInKB,
  originalFileInMB,
  originalCanvasRef,
}: OriginalImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  // const [zoom, setZoom] = useState(1);
  const startPositionRef = useRef({ x: 0, y: 0 });

  const { handleMouseDown } = useMoveImage({
    startPositionRef,
    position,
    setPosition,
    isDragging,
    setIsDragging,
  });

  useEffect(() => {
      if (originalFileInKB !== null || originalFileInMB !== null) {
        setIsLoading(false);
      }
    }, [originalFileInKB, originalFileInMB]
  );

  return (
    <div className="w-[50%] border-r flex flex-col">
      <div className="flex flex-row fixed top-0 px-5 py-2 bg-color-200">
        {!isLoading ? (
          <>
        {originalFileInKB > 1024 ? (
          <p className="text-3xl text-center">
            {originalFileInMB.toFixed(2) + " MB"}
          </p>
        ) : (
          <p className="text-3xl text-center">
            {originalFileInKB.toFixed(2) + " KB"}
          </p>
        )}
          </>
        ) : (
          <l-dot-pulse size="43" speed="1.3" color="#E1E7E9"></l-dot-pulse>
        )}
      </div>
      <canvas
        style={{ objectPosition: `${position.x}px ${position.y}px` }}
        onMouseDown={handleMouseDown}
        ref={originalCanvasRef}
        className={`w-full h-screen object-cover ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      />
    </div>
  );
}
