import { iconFile } from "@/assets/icons";

export default function Footer() {
  return (
    <footer className="pt-40 relative flex justify-end font-nunito ">
      <p className="absolute bottom-2 flex flex-row gap-1">
        Made with{" "}
        <span className="text-color-200">{iconFile.heartIcon}</span> by
        Daniel Saavedra
      </p>
    </footer>
  );
}
