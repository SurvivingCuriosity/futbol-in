// app/agregar-futbolin/page.tsx
"use client";

import dynamic from "next/dynamic";

const AgregarFutbolinPageNoSSR = dynamic(
  () => import("@/features/AgregarFutbolin/AgregarFutbolinPage"),
  { ssr: false }
);

const Page = () => <AgregarFutbolinPageNoSSR />;
export default Page;
