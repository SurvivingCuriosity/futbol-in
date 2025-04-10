"use client";

import { BotoneraCompartir } from "@/client/shared/components/TarjetaLugar/components/BotoneraCompartir";
import { BotonesLikeDislike } from "@/client/shared/components/TarjetaLugar/components/BotonesLikeDislike";
import { Comentarios } from "@/client/shared/components/TarjetaLugar/components/Comentarios";
import { IndicadorCobertura } from "@/client/shared/components/TarjetaLugar/components/IndicadorCobertura";
import { MarcaVerificado } from "@/client/shared/components/TarjetaLugar/components/MarcaVerificado";
import { MensajeUltimaValoracion } from "@/client/shared/components/TarjetaLugar/components/MensajeUltimaValoracion";
import { ImagenFutbolinMapNoDeg } from "@/client/shared/constants/FutbolinesImageMap";
import { ImagenFutbolinLogoMap } from "@/client/shared/constants/FutbolinesLogoImageMap";
import { useGetLoggedInUserClient } from "@/client/shared/hooks/useGetLoggedInUserClient";
import { GoBackLayout } from "@/client/shared/layouts/GoBackLayout";
import { TipoFutbolinNombre } from "@/core/enum/Futbolin/TipoFutbolin";
import { SpotDTO } from "@/server/models/Spot/SpotDTO";
import { faLocationDot, faStore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export const DetalleFutbolinPage = ({ futbolin }: { futbolin: SpotDTO }) => {
  const imagen = ImagenFutbolinMapNoDeg[futbolin.tipoFutbolin];
  const logo = ImagenFutbolinLogoMap[futbolin.tipoFutbolin];
  const user = useGetLoggedInUserClient();
  const agregadoPorUsuario = futbolin.addedByUserId === user?.id;


  return (
    <GoBackLayout href="/spots" label="Futbolines">
    <div
      className={`flex flex-col justify-between w-full h-full duration-300 max-w-xl mx-auto`}
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
              {TipoFutbolinNombre[futbolin.tipoFutbolin]}
            </p>
          </div>
          <div className="space-y-1 my-2">
            <div className="flex items-center gap-1 text-neutral-300">
              <FontAwesomeIcon className="w-6" icon={faStore} />
              <p>{futbolin.nombre}</p>
            </div>
            <div className="flex items-center gap-1 text-neutral-300">
              <FontAwesomeIcon className="w-6" icon={faLocationDot} />
              <p>{futbolin.ciudad}</p>
            </div>
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

      <div className="rounded-lg w-full flex justify-between z-2">
        <div className="w-full relative">
          <div className="mt-2 ml-1 space-y-1 relative">
            {futbolin.verificado && (
              <MarcaVerificado
                fecha={new Date(futbolin.verificado.fechaVerificacion)}
                correcto={futbolin.verificado.correcto}
              />
            )}
          </div>
        </div>
      </div>
      <div className="relative">
        {futbolin.verificado === null && (
          <IndicadorCobertura
            downVotes={futbolin.votes.down.length}
            upVotes={futbolin.votes.up.length}
          />
        )}
      </div>
      <BotoneraCompartir googlePlaceId={futbolin.googlePlaceId} idSpot={futbolin.id} />
      <Comentarios comentarios={futbolin.comentarios} />
      <MensajeUltimaValoracion />
      <BotonesLikeDislike
        spot={futbolin}
        onChangeSpotCallback={() => {}}
        agregadoPorUsuario={agregadoPorUsuario}
      />
    </div>
    </GoBackLayout>
  );
};
