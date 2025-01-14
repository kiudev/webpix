import React, { useEffect, useCallback } from "react";
interface MoveImageProps {
  startPositionRef: React.RefObject<{ x: number; y: number }>;
  position: { x: number; y: number };
  setPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  isDragging: boolean;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function useMoveImage({
  startPositionRef,
  position,
  setPosition,
  isDragging,
  setIsDragging,
}: MoveImageProps) {
  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      setIsDragging(true);
      startPositionRef.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      };
    },
    [position, setIsDragging, startPositionRef]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      const newX = e.clientX - startPositionRef.current.x;
      const newY = e.clientY - startPositionRef.current.y;

      setPosition({ x: newX, y: newY });
    },
    [isDragging, setPosition, startPositionRef]
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
