import { ModalidadJuego } from "@/core/enum/Competicion/ModalidadJuego";
import { TipoCompeticion } from "@/core/enum/Competicion/TipoCompeticion";
import { TipoFutbolin } from "@/core/enum/Futbolin/TipoFutbolin";
import React, { createContext, useState } from "react";
import { CrearTorneoContextType } from "./ContextType";

const CrearTorneoContext = createContext<CrearTorneoContextType>(
  null as unknown as CrearTorneoContextType
);

const CrearTorneoProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeStep, setActiveStep] = useState(0);

  const [tipoDeCompeticion, setTipoDeCompeticion] = useState<TipoCompeticion>(
    TipoCompeticion.LIGA
  );
  const [modalidadDeJuego, setModalidadDeJuego] = useState<ModalidadJuego>(
    ModalidadJuego.COMBINADO
  );
  const [tipoDeFutbolin, setTipoDeFutbolin] = useState<TipoFutbolin>(
    TipoFutbolin.TSUNAMI
  );

  const handleCompletarTipoDeCompeticion = (t: TipoCompeticion) => {
    setTipoDeCompeticion(t);
    setActiveStep(activeStep + 1);
  };

  const handleCompletarModalidadDeJuego = (
    f: TipoFutbolin,
    m: ModalidadJuego
  ) => {
    setTipoDeFutbolin(f);
    setModalidadDeJuego(m);
    setActiveStep(activeStep + 1);
  };

  return (
    <CrearTorneoContext
      value={{
        activeStep,
        setActiveStep,
        tipoDeCompeticion,
        modalidadDeJuego,
        tipoDeFutbolin,
        handleCompletarTipoDeCompeticion,
        handleCompletarModalidadDeJuego,
      }}
    >
      {children}
    </CrearTorneoContext>
  );
};

export { CrearTorneoContext, CrearTorneoProvider };
