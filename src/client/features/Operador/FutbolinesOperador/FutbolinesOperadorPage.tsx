"use client";

import { ImagenFutbolinLogoMap } from "@/client/shared/constants/FutbolinesLogoImageMap";
import { GoBackLayout } from "@/client/shared/layouts/GoBackLayout";
import { SpotDTO } from "@/server/models/Spot/SpotDTO";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export const FutbolinesOperadorPage = ({
  futbolines,
}: {
  futbolines: SpotDTO[];
}) => {
  const params = useSearchParams();
  const from = params.get("from");

  return (
    <GoBackLayout href={from || "/perfil"} className="max-w-screen-lg mx-auto">
      <ul className="flex flex-col gap-2">
        {futbolines.map((f) => (
          <div
            key={f.id}
            className="border border-neutral-800 flex flex-col gap-1 p-2 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <Image
                src={ImagenFutbolinLogoMap[f.tipoFutbolin]}
                width={25}
                height={25}
                alt="Logo futbolin"
              />
              <p>{f.tipoFutbolin}</p>
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faLocationDot} height={14} width={14} />
              <div className="flex flex-col">
                <p>{f.nombre}</p>
                <p className="text-xs text-neutral-500">{f.ciudad}</p>
              </div>
            </div>
          </div>
        ))}
      </ul>
    </GoBackLayout>
  );
};
