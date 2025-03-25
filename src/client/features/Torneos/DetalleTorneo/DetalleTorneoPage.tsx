import { GoBackLayout } from "@/client/shared/layouts/GoBackLayout";
import { CompeticionDTO } from "@/server/models/Competicion/CompeticionDTO";
import {
    faFutbol,
    faGamepad,
    faLocationDot,
    faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export const DetalleCompeticionPage = ({
  competicion,
  placeDetails,
  isOwner,
}: {
  competicion: CompeticionDTO;
  placeDetails: google.maps.places.PlaceResult;
  isOwner: boolean;
}) => {
  const abierto = placeDetails.opening_hours?.open_now;

  return (
    <GoBackLayout href="/competicion/torneos">
      <div className="h-[calc(100dvh-6.5rem)] md:h-[calc(100dvh-8.5rem)] relative overflow-hidden">
        <FontAwesomeIcon icon={faTrophy} className="absolte fixed -top-8 md:top-2 md:absolute md:right-1 -right-8 text-neutral-500/20 -rotate-12 text-[200px]" />
        <h1 className="text-3xl md:text-4xl font-black text-primary mb-4">
          {competicion.nombre}
        </h1>
        <div className="relative w-fit p-2 rounded-lg">
          <div className="flex items-center gap-2 ">
            <p
              className={`absolute top-1 right-1 text-xs ${
                abierto ? "text-green-500" : "text-red-500"
              }`}
            >
              {abierto ? "Abierto" : "Cerrado"}
            </p>
            <FontAwesomeIcon width={20} height={20} icon={faLocationDot} />
            <p className="text-neutral-300 text-xl font-bold tracking-tighter">
              {placeDetails.name}
            </p>
          </div>
          <p className="text-neutral-500">{placeDetails.vicinity}</p>
        </div>
        <p className="text-neutral-400 p-2 text-sm">
          {competicion.descripcion}
        </p>

        <div className="flex items-center gap-1 p-2">
          <div className="flex items-center gap-1 bg-neutral-800 w-fit p-1 text-xs rounded-md text-neutral-400 border border-neutral-600">
            <FontAwesomeIcon icon={faGamepad} />
            <p className="">{competicion.modalidadDeJuego}</p>
          </div>
          <div className="flex items-center gap-1 bg-neutral-800 w-fit p-1 text-xs rounded-md text-neutral-400 border border-neutral-600">
            <FontAwesomeIcon icon={faFutbol} />
            <p className="">{competicion.tipoDeFutbolin}</p>
          </div>
          <div className="flex items-center gap-1 bg-neutral-800 w-fit p-1 text-xs rounded-md text-neutral-400 border border-neutral-600">
            <FontAwesomeIcon icon={faTrophy} />
            <p className="">{competicion.tipoDeCompeticion}</p>
          </div>
        </div>

        <hr className="my-4 border-neutral-600" />

        <p className="my-2 text-neutral-500">Participantes:</p>
        {competicion.equipos.length === 0 ? (
          <p className="p-4 bg-neutral-900 rounded-lg flex items-center justify-center text-neutral-500">
            No hay participantes
          </p>
        ) : (
          <ul>
            {competicion.equipos.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        )}

        <div className="flex items-center gap-2 mt-4">
            <Link href={`/competicion/torneos/${competicion.id}/clasificacion`} className="bg-neutral-800 border border-neutral-600 text-neutral-400 p-2 rounded-lg px-4 mx-auto block w-full text-center">Ver clasificacion</Link>
            {isOwner && <Link href={`#`} className="bg-neutral-800 border border-neutral-600 text-neutral-400 p-2 rounded-lg px-4 mx-auto block w-full text-center">Editar</Link>}
        </div>
      </div>
    </GoBackLayout>
  );
};
