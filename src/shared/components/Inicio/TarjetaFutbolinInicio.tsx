import React from "react";
import tsunami_zoom from "@/shared/assets/img/tsunami_zoompng.png";
import Image from "next/image";
import { ILugar } from "@/shared/models/Futbolin.model";

export const TarjetaFutbolinInicio = ({lugar}: {lugar: ILugar}) => {
  
  return (
    <div className="bg-neutral-100 relative min-w-[300px] w-[200px] rounded-lg overflow-hidden snap-center">

        <div
          style={{
            clipPath: "polygon(0 0, 80% 0, 50% 100%, 0 100%)",
          }}
          className="p-4 bg-black/80 absolute top-0 left-0 w-full h-full backdrop-blur-[1px]"
        >
          <p className="text-white">{lugar.nombre}</p>
          <p className="text-white">{lugar.tipoFutbolin}</p>
        </div>
        <Image
          width={200}
          height={200}
          alt="Imagen futbolin"
          src={tsunami_zoom}
          className="w-full"
        />
    </div>
  );
};
