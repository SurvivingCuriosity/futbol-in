"use client";

import fondo_tipo_de_competicion from "@/client/shared/assets/img/torneos/competicion.webp";
import fondo_datos_basicos from "@/client/shared/assets/img/torneos/datos_basicos.webp";
import fondo_enfrentamientos from "@/client/shared/assets/img/torneos/enfrentamientos.webp";

import { Stepper } from "@/client/shared/components/Stepper";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import { DatosBasicos } from "./FormSteps/DatosBasicos";
import { Enfrentamientos } from "./FormSteps/Enfrentamientos/Enfrentamientos";
import { TipoDeCompeticion } from "./FormSteps/TipoDeCompeticion";

export const CrearTorneoPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const imagenFondoMap: Record<number, StaticImageData> = {
    0: fondo_datos_basicos,
    1: fondo_tipo_de_competicion,
    2: fondo_enfrentamientos,
    3: fondo_enfrentamientos,
  };

  const handleDatosBasicosCompleted = (datos: unknown) => {
    console.log(datos);
    setActiveStep(1);
  };

  const steps = [
    {
      t: "Datos básicos",
      component: <DatosBasicos onCompleted={handleDatosBasicosCompleted} />,
    },
    {
      t: "Tipo de competición",
      component: (
        <TipoDeCompeticion onCompleted={handleDatosBasicosCompleted} />
      ),
    },
    {
      t: "Enfrentamientos",
      component: <Enfrentamientos onCompleted={handleDatosBasicosCompleted} />,
    },
    { t: "Inscripciones", component: <div>2</div> },
  ];

  return (
    <>
      <div className="mx-auto flex h-[calc(100dvh_-_60px)] flex-col md:p-4 pt-0 md:h-[calc(100dvh_-_100px)] lg:h-[calc(100dvh_-_140px)] 2xl:w-10/12 w-full">
        <Stepper
          steps={steps}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      </div>
      <Image
        src={imagenFondoMap[activeStep]}
        alt="Imagen de fondo"
        className="object-cover fixed top-0 left-0 z-2 rounded-b-2xl h-[600px] w-auto md:top-16 md:left-1/2 md:-translate-x-1/2"
      />
    </>
  );
};
