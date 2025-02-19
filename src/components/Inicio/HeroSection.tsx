import { faMap, faTrophy, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "futbol-in-ui";
import Link from "next/link";

export const HeroSection = ({ loggedIn }: { loggedIn: boolean }) => {
  return (
    <div className="h-screen flex items-center justify-center">
      <main className="mt-20 lg:mt-0 p-4 max-w-screen-lg mx-auto flex flex-col items-center justify-center gap-4">
        <div className="max-w-3xl flex gap-4 flex-col items-stretch justify-center w-full">
          <h1 className="z-2 text-4xl xl:text-6xl mb-4 font-extrabold text-white tracking-tight text-pretty">
            Encuentra <span className="text-primary">Futbolines Cerca </span>de
            ti
          </h1>
          <p className="text-neutral-400">
            Usa tu ubicación o introduce una ciudad para encontrar futbolines.
            Filtra por marca, cercanía etc.
          </p>

          {!loggedIn && (
            <div className="flex items-center gap-2 w-full">
              <Link href="/login">
                <Button label="Iniciar sesión" />
              </Link>
              <Link href="/register">
                <Button label="Registrarme" variant="outline" />
              </Link>
            </div>
          )}

          <div className="z-2 relative">
            <input
              type="text"
              className="bg-neutral-700 rounded-3xl w-full h-12 p-2 relative placeholder:text-neutral-500 border border-neutral-600"
              placeholder="Busca un club..."
            />

            <div className="absolute right-1.5 top-0 h-full flex items-center">
              <button className="bg-primary rounded-3xl h-9/12 text-black font-bold px-4">
                Buscar
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center mt-20 space-y-4 space-x-0 lg:space-x-4">
          <div className="w-full lg:w-1/3 text-center flex flex-col items-center justify-center">
            <FontAwesomeIcon
              icon={faMap}
              width={24}
              height={24}
              className=" p-2 rounded-full size-12 text-primary bg-primary/20"
            />
            <p className="font-bold text-lg">Basado en tu ubicación</p>
            <p className="font-light text-neutral-400">
              Introduce tu localización o activa la ubicación para encontrar los
              futbolines más cercanos
            </p>
          </div>
          <div className="w-full lg:w-1/3 text-center flex flex-col items-center justify-center">
            <FontAwesomeIcon
              icon={faUsers}
              width={24}
              height={24}
              className=" p-2 rounded-full size-12 text-primary bg-primary/20"
            />
            <p className="font-bold text-lg">Impulsado por la comunidad</p>
            <p className="font-light text-neutral-400">
              Participa agregando nuevos futbolines y valorando los que otros
              usuarios añadan
            </p>
          </div>
          <div className="w-full lg:w-1/3 text-center flex flex-col items-center justify-center">
            <FontAwesomeIcon
              icon={faTrophy}
              width={24}
              height={24}
              className=" p-2 rounded-full size-12 text-primary bg-primary/20"
            />
            <p className="font-bold text-lg">Sistema de logros</p>
            <p className="font-light text-neutral-400">
              Agrega futbolines y valoralos para lograr insignias exclusivas y
              aparecer en el ranking.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
