import { iconFile } from "@/assets/icons";

export default function Footer() {
  return (
    <footer className="pt-40 relative flex justify-center font-nunito ">
      <p className="absolute bottom-2 flex flex-row gap-1">
        Made with{" "}
        <span className="text-primary-500">{iconFile.heartIcon}</span> by
        Daniel Saavedra
      </p>
    </footer>
  );
}
