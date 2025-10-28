"use client";

import Typewriter from "@/client/features/Landing/components/TypeWriter";
import {
  faChevronDown,
  faMap,
  faTrophy,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  DistribucionFutbolin,
  TipoFutbolin,
  TipoLugar,
} from "futbol-in-core/enum";
import Link from "next/link";
import { Mapa } from "../Mapa/Mapa";
import { Footer } from "./components/Footer";
export const LandingPage = () => {

  const sampleStaticRoutes = [
    { label: "Futbolines en Salamanca", href: `/ciudades/Salamanca_Salamanca` },
    { label: "Futbolines en Zamora", href: `/ciudades/Zamora_Zamora` },
  ];

  return (
    <>
      <main className="flex flex-col items-center justify-center gap-4">

        <div className="mt-12 md:mt-20 max-w-screen-lg flex gap-4 items-stretch justify-center w-full relative">
          <div>
            <h1
              style={{
                fontSize: "clamp(2.5em, 10vw, 4.5em)",
                lineHeight: "1em",
              }}
              className="mb-4 font-extrabold text-balance text-white tracking-tight"
            >
              Futbolines{" "}
              <span className="text-primary">
                <Typewriter />{" "}
              </span>
              cerca de ti
            </h1>
            <p className="text-lg text-neutral-300">
              Usa tu ubicación o introduce una ciudad para encontrar futbolines.
              Filtra por marca, cercanía etc.
            </p>
          </div>

          <div className="relative">
            {/* <div className="absolute top-0 left-0">
              <SearchInputRedirect />
            </div> */}
            <Mapa
              markers={[
                {
                  id: "1",
                  addedByUserId: "1",
                  coordinates: [-122.4324, 37.72825],
                  googlePlaceId: "ChIJa8s-tqOuEmsRUcIaWtf4MzE",
                  tipoFutbolin: TipoFutbolin.TSUNAMI,
                  ciudad: "Salamanca, Castilla y León, España",
                  comentarios: "",
                  direccion: "Av. de la Independencia, s/n",
                  nombre: "Salamanca Futbol Club",
                  distribucion: DistribucionFutbolin.F4,
                  idOperador: null,
                  tipoLugar: TipoLugar.FUBTOLIN,
                  verificado: {
                    correcto: true,
                    fechaVerificacion: new Date(),
                    idUser: "null",
                  },
                  votes: {
                    down: [],
                    up: [],
                  },
                },
              ]}
              onSelectMarker={() => {}}
              selectedMarker={null}
              userLocation={null}
              focusCoords={null}
              initialCenter={{
                lat: 40.963,
                lng: -5.6612,
              }}
              zoom={14}
            />
          </div>
        </div>
        <a href="#detalles" className="text-neutral-400 mx-auto my-5">
          <FontAwesomeIcon icon={faChevronDown} width={24} height={24} />
          Saber más
        </a>

        <div
          id="detalles"
          className="flex flex-col md:flex-row justify-between items-center mt-20 space-y-12 md:space-y-0 space-x-0 md:space-x-4"
        >
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
        <div className="flex flex-col bg-neutral-950 p-8 w-full h-full">
          {sampleStaticRoutes.map((r) => (
            <Link
              key={r.label}
              href={r.href}
              className="underline underline-offset-2 text-neutral-400 decoration-neutral-700 mb-2"
            >
              {r.label}
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};
