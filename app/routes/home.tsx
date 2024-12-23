import type { Route } from "./+types/home";
import Home from "~/pages/home/index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Webpix" },
    { name: "description", content: "Welcome to Webpix!" },
  ];
}

export default function HomeRoute() {
  return (
    <>
      <Home />
    </>
  );
}
