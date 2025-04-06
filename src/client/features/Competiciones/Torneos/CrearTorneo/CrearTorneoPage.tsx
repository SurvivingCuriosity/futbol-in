"use client";

import { Stepper } from "@/client/shared/components/Stepper";
import { use } from "react";
import { CrearTorneoContext } from "./context/CrearTorneoContext";
import { useCrearTorneoSteps } from "./FormSteps/useCrearTorneoSteps";

export const CrearTorneoPage = () => {
  const {
    activeStep,
    setActiveStep,
  } = use(CrearTorneoContext);

  const steps = useCrearTorneoSteps()

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
