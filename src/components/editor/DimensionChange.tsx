interface DimensionChangeProps {
  aspectRatio: number | null;
  params: {
    width: number;
    height: number;
    quality: number;
  };
  setParams: React.Dispatch<
    React.SetStateAction<{
      width: number;
      height: number;
      quality: number;
    }>
  >;
}

export const handleDimensionChange = (
  key: "width" | "height",
  value: number,
  ...rest: [DimensionChangeProps]
) => {
  const { aspectRatio, params, setParams } = rest[0];
  if (!aspectRatio) return;

  if (key === "width") {
    setParams({
      ...params,
      width: value,
      height: Math.round(value / aspectRatio),
    });
  } else {
    setParams({
      ...params,
      height: value,
      width: Math.round(value * aspectRatio),
    });
  }
};
