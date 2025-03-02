"use client";
import dynamic from "next/dynamic";

// Importa *por nombre* tu DrawerImpl
const DrawerNoSSR = dynamic(
  () => import("./DrawerImpl").then((mod) => mod.DrawerImpl),
  {
    ssr: false, // Desactivamos el SSR
  }
);

export default DrawerNoSSR;
