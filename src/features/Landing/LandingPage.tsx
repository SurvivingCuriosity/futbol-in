import { AppLogo } from "@/shared/components/AppLogo";
import { LoginRegister } from "@/shared/components/LandingPage/LoginRegister";
import Typewriter from "@/shared/components/LandingPage/TypeWriter";
import SearchInputCiudad from "@/shared/components/SearchInputCiudad";
import { faMap, faTrophy, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const LandingPage = async () => {
  return (
    <main className="flex flex-col items-center justify-center gap-4">
      
      <menu className="max-w-screen-xl mx-auto h-16 bg-neutral-950/95 fixed top-0 p-4 flex items-center justify-between w-full z-1">
        <AppLogo />
        <LoginRegister />
      </menu>

      <div className="mt-20 max-w-3xl flex gap-4 flex-col items-stretch justify-center w-full">
        <h1
          style={{ fontSize: "clamp(2.5em, 10vw, 4.5em)", lineHeight: "1em" }}
          className="mb-4 font-extrabold text-balance text-white tracking-tight"
        >
          Encuentra{" "}
          <span className="text-primary">
            <Typewriter />{" "}
          </span>
          cerca de ti
        </h1>
        <p className="text-neutral-400">
          Usa tu ubicación o introduce una ciudad para encontrar futbolines.
          Filtra por marca, cercanía etc.
        </p>

        <SearchInputCiudad />

        {/* <div className="z-2 relative">
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
        </div> */}
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
