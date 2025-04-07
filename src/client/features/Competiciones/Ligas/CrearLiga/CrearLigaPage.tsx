"use client";

import { Stepper } from "@/client/shared/components/Stepper";
import { use } from "react";
import { CrearLigaContext } from "./context/CrearLigaContext";
import { useCrearLigaSteps } from "./FormSteps/useCrearLigaSteps";

export const CrearLigaPage = () => {
  const {
    activeStep,
    setActiveStep,
  } = use(CrearLigaContext);

  const steps = useCrearLigaSteps()

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
      </div>
    </>
  );
};
