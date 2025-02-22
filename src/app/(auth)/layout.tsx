import imagen_fondo from "@/assets/img/background.jpg";
import { AppLogo } from "@/shared/components/AppLogo";
import Image from "next/image";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {

  return (
    <section className="h-dvh flex items-start justify-center relative overflow-scroll">
      <Image
        alt="Imagen de fondo"
        src={imagen_fondo}
        className="h-full absolute object-bottom left-0 object-cover user-select-none"
      />
      <div className="z-1 w-full p-4">
        <div className="flex flex-col items-start justify-center max-w-screen-lg mx-auto">
          <AppLogo href="/" />
          <div className="mt-4 bg-neutral-950/80 backdrop-blur-xs rounded-lg p-4 w-full max-w-[500px] mx-auto border border-neutral-800">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default layout;
