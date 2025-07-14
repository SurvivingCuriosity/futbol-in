"use client";

import { BotoneraCompartir } from "@/client/shared/components/TarjetaLugar/components/BotoneraCompartir";
import { BotonesLikeDislike } from "@/client/shared/components/TarjetaLugar/components/BotonesLikeDislike";
import { Comentarios } from "@/client/shared/components/TarjetaLugar/components/Comentarios";
import { IndicadorCobertura } from "@/client/shared/components/TarjetaLugar/components/IndicadorCobertura";
import { MarcaVerificado } from "@/client/shared/components/TarjetaLugar/components/MarcaVerificado";
import { ImagenFutbolinMapNoDeg } from "@/client/shared/constants/FutbolinesImageMap";
import { ImagenFutbolinLogoMap } from "@/client/shared/constants/FutbolinesLogoImageMap";
import { useGetLoggedInUserClient } from "@/client/shared/hooks/useGetLoggedInUserClient";
import { GoBackLayout } from "@/client/shared/layouts/GoBackLayout";
import { TipoFutbolinNombre } from "futbol-in-core/enum";
import { esUsuarioVerificado } from "futbol-in-core/helpers";
import { SpotDTO } from "futbol-in-core/types";
import { UserDTO } from "futbol-in-core/types";
import { faLocationDot, faStore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "futbol-in-ui";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const DetalleFutbolinPage = ({
  futbolin,
  addedByUser,
}: {
  futbolin: SpotDTO;
  addedByUser: UserDTO | null;
}) => {
  const imagen = ImagenFutbolinMapNoDeg[futbolin.tipoFutbolin];
  const logo = ImagenFutbolinLogoMap[futbolin.tipoFutbolin];
  const user = useGetLoggedInUserClient();
  const agregadoPorUsuario = futbolin.addedByUserId === user?.id;
  const router = useRouter();
  const [innerSpot, setInnerSpot] = useState<SpotDTO>(futbolin);

  const handleEditarFutbolin = () => {
    router.push(`/spots/detalle/${futbolin.id}/editar`);
  };

  return (
    <GoBackLayout href="/spots" label="Futbolines">
      <div
        className={`flex flex-col justify-between w-full h-full duration-300 max-w-2xl mx-auto`}
      >
        <div className="flex flex-col md:flex-row">
          <div>
            <div className="flex items-center gap-1 text-neutral-300">
              <Image
                src={logo}
                alt="Logo"
                width={72}
                height={72}
                className="w-14"
              />
              <p className="text-4xl font-bold">
                {TipoFutbolinNombre[innerSpot.tipoFutbolin]}
              </p>
            </div>
            <div className="space-y-1 my-2">
              <div className="flex items-center gap-1 text-neutral-300">
                <FontAwesomeIcon className="w-6" icon={faStore} />
                <p>{innerSpot.nombre}</p>
              </div>
              <div className="flex items-center gap-1 text-neutral-300">
                <FontAwesomeIcon className="w-6" icon={faLocationDot} />
                <p>{innerSpot.ciudad}</p>
              </div>
            </div>
            <div className="flex flex-row items-center gap-2 justify-between mb-2">
              <BotoneraCompartir
                googlePlaceId={innerSpot.googlePlaceId}
                idSpot={innerSpot.id}
              />
              {innerSpot.verificado === null && (
                <IndicadorCobertura
                  downVotes={innerSpot.votes.down.length}
                  upVotes={innerSpot.votes.up.length}
                />
              )}
            </div>
          </div>
          <Image
            src={imagen}
            alt="Imagen futbolin"
            width={200}
            height={200}
            className="w-full md:max-w-80 h-auto object-cover -top-2 -right-2 z-2 rounded-2xl mx-auto"
          />
        </div>
        <p className="my-2 text-neutral-400">
          Futbolín agregado por{" "}
          {addedByUser !== null ? (
            <Link href={`/user/${addedByUser.name}`} className="underline">
              {addedByUser.name}
            </Link>
          ) : (
            "desconocido"
          )}
        </p>

        <div className="rounded-lg w-full flex justify-between z-2">
          <div className="w-full relative">
            <div className="mt-2 ml-1 space-y-1 relative">
              {innerSpot.verificado && (
                <MarcaVerificado
                  fecha={new Date(innerSpot.verificado.fechaVerificacion)}
                  correcto={innerSpot.verificado.correcto}
                />
              )}
            </div>
          </div>
        </div>

        <Comentarios comentarios={innerSpot.comentarios} />

        <BotonesLikeDislike
          spot={innerSpot}
          onChangeSpotCallback={setInnerSpot}
          agregadoPorUsuario={agregadoPorUsuario}
        />
        {(agregadoPorUsuario || esUsuarioVerificado(user as UserDTO)) && (
          <Button onClick={handleEditarFutbolin} label="Editar" />
        )}
      </div>
    </GoBackLayout>
  );
};
