"use client";

import fondo_tipo_de_competicion from "@/client/shared/assets/img/torneos/competicion.webp";
import fondo_datos_basicos from "@/client/shared/assets/img/torneos/datos_basicos.webp";
import fondo_enfrentamientos from "@/client/shared/assets/img/torneos/enfrentamientos.webp";

import { Stepper } from "@/client/shared/components/Stepper";
import Image, { StaticImageData } from "next/image";
import { use } from "react";
import { CrearTorneoContext } from "./context/CrearTorneoContext";
import { useCrearTorneoSteps } from "./FormSteps/useCrearTorneoSteps";

export const CrearTorneoPage = () => {
  const {
    activeStep,
    setActiveStep,
  } = use(CrearTorneoContext);

  const steps = useCrearTorneoSteps()

  const imagenFondoMap: Record<number, StaticImageData> = {
    0: fondo_datos_basicos,
    1: fondo_tipo_de_competicion,
    2: fondo_enfrentamientos,
    3: fondo_enfrentamientos,
  };

  return (
    <>
      <div className="mx-auto flex flex-col lg:flex-row lg:p-4 h-[calc(100dvh_-_100px)] lg:w-10/12 w-full">
        <div className="lg:min-w-6/12 z-20">
          <Stepper
            steps={steps}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        </div>
        <Image
          src={imagenFondoMap[activeStep]}
          alt="Imagen de fondo"
          className="object-cover fixed top-16 left-0 z-2 rounded-b-2xl h-[600px] w-auto lg:top-16 lg:relative lg:aspect-[12/16]"
        />
      </div>
    </>
  );
};
