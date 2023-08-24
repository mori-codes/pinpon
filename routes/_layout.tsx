import { LayoutProps } from "$fresh/server.ts";

export default function Layout({ Component, url }: LayoutProps) {
  return (
    <div className="w-full">
      <div className="w-full grid grid-cols-3">
        <a
          className={`py-4 text-xl text-center ${
            url.pathname.length === 1 ? "border-b-4 border-green-300" : ""
          }`}
          href="/"
        >
          Grupos
        </a>
        <a
          className={`py-4 text-xl text-center ${
            url.pathname.includes("/championship")
              ? "border-b-4 border-green-300"
              : ""
          }`}
          href="/championship"
        >
          Torneo
        </a>
        <a
          className={`py-4 text-xl text-center ${
            url.pathname.includes("/history")
              ? "border-b-4 border-green-300"
              : ""
          }`}
          href="/history"
        >
          Historial
        </a>
      </div>
      <Component />
    </div>
  );
}
