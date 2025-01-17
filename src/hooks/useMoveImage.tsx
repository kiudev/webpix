import React, { useEffect, useCallback } from "react";
interface MoveImageProps {
  startPositionRef: React.RefObject<{ x: number; y: number }>;
  imagePosition: { x: number; y: number };
  setImagePosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  isDragging: boolean;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function useMoveImage({
  startPositionRef,
  imagePosition,
  setImagePosition,
  isDragging,
  setIsDragging,
}: MoveImageProps) {
  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      setIsDragging(true);
      startPositionRef.current = {
        x: e.clientX - imagePosition.x,
        y: e.clientY - imagePosition.y,
      };
    },
    [imagePosition, setIsDragging, startPositionRef]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      const newX = e.clientX - startPositionRef.current.x;
      const newY = e.clientY - startPositionRef.current.y;

      setImagePosition({ x: newX, y: newY });
    },
    [isDragging, setImagePosition, startPositionRef]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, [setIsDragging]);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return { handleMouseDown };
}
