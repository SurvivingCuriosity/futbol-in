"use client";

import { SpotDTO } from "@/server/models/Spot/SpotDTO";
import { OperadorDTO } from "@/server/models/User/OperadorDTO";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ImagenFutbolinLogoMap } from "../../constants/FutbolinesLogoImageMap";
import { BotoneraCompartir } from "./components/BotoneraCompartir";
import { BotonReclamarComoOperador } from "./components/BotonReclamarComoOperador";
import { MainInfo } from "./components/MainInfo";
import { ImagenCuadrada } from "../ImagenCuadrada";
import { StorageClient } from "../../client/StorageClient";

export interface TarjetaLugarProps {
  spot: SpotDTO;
  selected?: boolean;
  onSelect?: (l: SpotDTO | null) => void;
  distanciaMessage: string | null;
  puedeReclamarloComoOperador?: boolean;
  operador: OperadorDTO|null|undefined
}

export const TarjetaLugar = (props: TarjetaLugarProps) => {
  const {
    spot: spotProp,
    selected,
    onSelect,
    distanciaMessage,
    puedeReclamarloComoOperador = false,
    operador
  } = props;

  const [spot, setSpot] = useState<SpotDTO>(spotProp);

  const [logoOperador, setLogoOperador] = useState<string>('');

  useEffect(() => {
    const getImageUrl = async () => {
      if(!operador || !operador.logo) return;
      const res = await StorageClient.getImageUrl(operador?.logo);
      setLogoOperador(res);
    }
    getImageUrl();
  }, [operador?.logo, operador]);

  useEffect(() => {
    setSpot(spotProp);
  }, [spotProp]);

  const handleClickSpot = () => {
    if (!onSelect) return;
    onSelect(selected ? null : spot);
  };

  const logo = ImagenFutbolinLogoMap[spot.tipoFutbolin];

  return (
    <div
      className={`group relative p-2 md:p-3 border border-neutral-700 bg-neutral-900 rounded-lg select-none w-full md:min-w-[400px] overflow-hidden`}
    >
      <span className="absolute top-1 right-1 z-3 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
        <BotoneraCompartir
          googlePlaceId={spot.googlePlaceId}
          idSpot={spot.id}
        />
      </span>

      <Image
        src={logo}
        alt={`Logo ${spot.tipoFutbolin}`}
        width={200}
        height={200}
        className="w-40 absolute -top-10 -left-2 z-1 -rotate-12 opacity-5 pointer-events-none"
      />
      <div onClick={handleClickSpot} className="relative">
        <MainInfo spot={spot} isOpen={!!selected} />
        <div className="w-full flex justify-between items-center mt-2">
          {distanciaMessage && (
            <span className="flex items-center gap-1 text-neutral-400 z-2">
              <FontAwesomeIcon icon={faLocationCrosshairs} />
              <p>{distanciaMessage}</p>
            </span>
          )}
          <Link
            href={`/spots/detalle/${spot.id}`}
            className="ml-auto z-2 text-neutral-400 p-0.5"
          >
            Más detalles
          </Link>
        </div>

        {operador && 
          <Link href={`/operador/${operador.id}`} className="flex items-center gap-2 ml-auto z-2 text-neutral-400 p-0.5 underline">
            <ImagenCuadrada 
              size="sm"
              src={logoOperador}
              alt="Logo de la empresa"
            />
            {operador.nombreComercial}
          </Link>
        }

        {puedeReclamarloComoOperador && spot.idOperador !== operador?.id && (
          <BotonReclamarComoOperador spot={spot} onUpdate={setSpot}/>
        )}
      </div>
    </div>
  );
};
