"use client";
import Image from "next/image";
import { SearchInputRedirect } from "../Landing/components/SearchInputRedirect";
import salamanca from "@/client/shared/assets/img/ciudades/salamanca.jpg";
import valencia from "@/client/shared/assets/img/ciudades/valencia.jpg";
import lugo from "@/client/shared/assets/img/ciudades/lugo.webp";
import valladolid from "@/client/shared/assets/img/ciudades/valladolid.jpg";
import zamora from "@/client/shared/assets/img/ciudades/zamora.jpg";
import Link from "next/link";

export const SpotsVacio = () => {
  const ciudades = [
    {
      id: "1",
      nombre: "Salamanca",
      imagen: salamanca,
      href: "/Salamanca_Salamanca",
    },
    {
      id: "2",
      nombre: "Valencia",
      imagen: valencia,
      href: "/Valencia_Valencia",
    },
    {
      id: "3",
      nombre: "Lugo",
      imagen: lugo,
      href: "/Lugo_Lugo",
    },
    {
      id: "4",
      nombre: "Valladolid",
      imagen: valladolid,
      href: "/Valladolid_Valladolid",
    },
    {
      id: "5",
      nombre: "Zamora",
      imagen: zamora,
      href: "/Zamora_Zamora",
    },
  ];

  return (
    <div className="w-full">
      <div className="sticky top-0 z-3 py-2 bg-neutral-950">
        <SearchInputRedirect />
      </div>
      <div className="flex flex-row flex-wrap items-center justify-center gap-4 w-full mt-4">
        {ciudades.map((ciudad) => (
          <Link
            href={`/ciudades/${ciudad.href}`}
            key={ciudad.id}
            className="rounded-xl h-40 max-w-90 relative flex flex-col items-center justify-center gap-4 w-full overflow-hidden"
          >
            <p className="text-center mt-20 text-xl font-bold text-neutral-300 z-2">
              Futbolines en {ciudad.nombre}
            </p>
            <Image
              src={ciudad.imagen}
              alt={ciudad.nombre}
              className="w-full h-full object-cover absolute top-0"
              style={{
                objectPosition: "0px -20px",
              }}
            />
            <span
              className="absolute inset-0 z-0
              pointer-events-none
              bg-gradient-to-t from-neutral-900 via-neutral-900/80 to-neutral-900/20"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
