import { EquipoDTO } from "@/server/models/Equipo/EquipoDTO";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const TarjetaEquipo = ({ equipo }: { equipo: EquipoDTO }) => {
  const [imagenEquipo, setImagenEquipo] = useState("");

  useEffect(() => {
    getImageUrl().then((url) => setImagenEquipo(url));
  }, []);

  const getImageUrl = async () => {
    const res = await fetch(
      `/api/storage/files?path=${encodeURIComponent(equipo.imagenEquipo)}`
    );
    const { url } = await res.json();

    return url;
  };
  return (
    <Link
      href={`/equipos/${equipo.id}`}
      key={equipo.id}
      className="w-30 flex flex-col items-center justify-center p-2 border rounded-lg bg-neutral-900 border-neutral-700"
    >
      <Image
        src={imagenEquipo || "/default_user.svg"}
        alt="Imagen de equipo"
        width={100}
        height={100}
        className="rounded-full size-14"
      />
      <div className="flex flex-col items-start">
        <p className="text-primary font-bold">{equipo.nombreEquipo}</p>
        {equipo.jugadores && (
          <div className="flex items-center gap-1 text-sm text-neutral-300">
            <FontAwesomeIcon icon={faUser} />
            <p className="">{equipo.jugadores[0].nombre}</p>
          </div>
        )}
      </div>
    </Link>
  );
};
