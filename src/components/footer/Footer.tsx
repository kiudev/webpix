import { iconFile } from "@/assets/icons";

export default function Footer() {
  return (
    <footer className="pt-40 relative">
      <div className="absolute bottom-5 left-0 right-0 flex flex-row justify-between gap-5 items-center">
        <p className="flex flex-row gap-1 font-semibold">
          &copy; {new Date().getFullYear()} Daniel Saavedra
        </p>
        <ul className="flex gap-3 items-center">
          <li className="hover:scale-110 transition-all">
            <a target="_blank" href="https://github.com/kiudev">
              {iconFile.githubIcon}
            </a>
          </li>
          <li className="hover:scale-110 transition-all">
            <a target="_blank" href="https://linkedin.com/in/danisaavedraes/">
              {iconFile.linkedinIcon}
            </a>
          </li>
          <li className="hover:scale-110 transition-all">
            <a target="_blank" href="https://danielsaavedra.dev">
              {iconFile.portfolioIcon}
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
