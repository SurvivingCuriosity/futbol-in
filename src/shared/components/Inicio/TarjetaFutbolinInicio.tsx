import React from "react";
import tsunami_zoom from "@/assets/img/tsunami_zoompng.png";
import Image from "next/image";

export const TarjetaFutbolinInicio = () => {
  return (
    <div className="bg-neutral-100 relative min-w-[300px] w-[200px] rounded-lg overflow-hidden snap-center">

        <div
          style={{
            clipPath: "polygon(0 0, 80% 0, 50% 100%, 0 100%)",
          }}
          className="p-4 bg-black/80 absolute top-0 left-0 w-full h-full backdrop-blur-[1px]"
        >
          <p className="text-white">Calle las amapolas, 123</p>
          <p className="text-white">Tipo: Tsunami</p>
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
