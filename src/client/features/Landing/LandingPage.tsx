import Typewriter from "@/client/features/Landing/components/TypeWriter";
import { AppLogo } from "@/client/shared/components/AppLogo";
import { LoginRegister } from "@/client/shared/components/Nav/components/LoginRegister";
import { faMap, faTrophy, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { SearchInputRedirect } from "./components/SearchInputRedirect";

export const LandingPage = async () => {
  const sampleStaticRoutes = [
    { label: "Futbolines en Salamanca", href: `/spots/Salamanca_Salamanca` },
    { label: "Futbolines en Zamora", href: `/spots/Zamora_Zamora` },
  ];

  return (
    <main className="flex flex-col items-center justify-center gap-4">
      <div className="md:hidden mr-auto flex justify-between items-center w-full">
        <AppLogo />
        <LoginRegister />
      </div>

      <div className="mt-20 max-w-3xl flex gap-4 flex-col items-stretch justify-center w-full">
        <h1
          style={{ fontSize: "clamp(2.5em, 10vw, 4.5em)", lineHeight: "1em" }}
          className="mb-4 font-extrabold text-balance text-white tracking-tight"
        >
          Futbolines{" "}
          <span className="text-primary">
            <Typewriter />{" "}
          </span>
          cerca de ti
        </h1>
        <p className="text-neutral-400">
          Usa tu ubicación o introduce una ciudad para encontrar futbolines.
          Filtra por marca, cercanía etc.
        </p>

        <SearchInputRedirect />
        
        {sampleStaticRoutes.map((r) => (
          <Link key={r.label} href={r.href} className="underline underline-offset-2 text-neutral-400 decoration-neutral-700">
            {r.label}
          </Link>
        ))}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-20 space-y-12 md:space-y-0 space-x-0 md:space-x-4">
        <div className="w-full lg:w-1/3 p-4 max-w-sm text-center flex flex-col items-center justify-center">
          <FontAwesomeIcon
            icon={faMap}
            width={24}
            height={24}
            className="p-4 aspect-square size-5 rounded-full text-primary bg-primary/20"
          />
          <p className="font-bold text-lg">Basado en tu ubicación</p>
          <p className="font-light text-neutral-400">
            Introduce tu localización o activa la ubicación para encontrar los
            futbolines más cercanos
          </p>
        </div>
        <div className="w-full lg:w-1/3 p-4 max-w-sm text-center flex flex-col items-center justify-center">
          <FontAwesomeIcon
            icon={faUsers}
            width={24}
            height={24}
            className="p-4 aspect-square size-5 rounded-full text-primary bg-primary/20"
          />
          <p className="font-bold text-lg">Impulsado por la comunidad</p>
          <p className="font-light text-neutral-400">
            Participa agregando nuevos futbolines y valorando los que otros
            usuarios añadan
          </p>
        </div>
        <div className="w-full lg:w-1/3 p-4 max-w-sm text-center flex flex-col items-center justify-center">
          <FontAwesomeIcon
            icon={faTrophy}
            width={24}
            height={24}
            className="p-4 aspect-square size-5 rounded-full text-primary bg-primary/20"
          />
          <p className="font-bold text-lg">Sistema de logros</p>
          <p className="font-light text-neutral-400">
            Agrega futbolines y valoralos para lograr insignias exclusivas y
            aparecer en el ranking.
          </p>
        </div>
      </div>
    </main>
  );
};
