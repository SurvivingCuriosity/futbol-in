import { ModalidadJuego } from "@/core/enum/Competicion/ModalidadJuego";
import { TipoInscripcion } from "@/core/enum/Competicion/TipoInscripcion";
import { TipoFutbolin } from "@/core/enum/Futbolin/TipoFutbolin";
import React, { createContext, useState } from "react";
import { ConfiguracionBasica } from "../../../common/types/ConfiguracionBasica";
import { ConfigEnfrentamiento } from "../FormSteps/Enfrentamientos/FormEnfrentamientos";
import { ConfiguracionLiga } from "../types/ConfiguracionLiga";
import { CompeticionEnCreacion, CrearLigaContextType } from "./ContextType";

const CrearLigaContext = createContext<CrearLigaContextType>(
  null as unknown as CrearLigaContextType
);

const CrearLigaProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeStep, setActiveStep] = useState(0);

  const [nombre, setNombre] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [googlePlaceId, setGooglePlaceId] = useState<string>("");

  const [modalidadDeJuego, setModalidadDeJuego] = useState<ModalidadJuego>(
    ModalidadJuego.COMBINADO
  );
  const [tipoDeFutbolin, setTipoDeFutbolin] = useState<TipoFutbolin>(
    TipoFutbolin.TSUNAMI
  );

  const [tipoInscripcion, setTipoInscripcion] = useState<TipoInscripcion>(
    TipoInscripcion.ABIERTO
  );
  const [cantidadParejas, setCantidadParejas] = useState<number>(16);

  const [configEnfrentamiento, setConfigEnfrentamiento] = useState<ConfigEnfrentamiento>({
    cantidadPartidos: 4,
    golesParaGanar: 10,
  });

  const [competicionEnCreacion, setCompeticionEnCreacion] = useState<CompeticionEnCreacion|undefined>()

  const handleCompletarModalidadDeJuego = (
    f: TipoFutbolin,
    m: ModalidadJuego
  ) => {
    setTipoDeFutbolin(f);
    setModalidadDeJuego(m);
    setActiveStep(activeStep + 1);
  };

  const handleCompletarConfigurarLiga = (c:ConfiguracionLiga) => {
    setActiveStep(activeStep + 1);
    console.log(c)
  };

  const handleCompletarDatosBasicos = (c: ConfiguracionBasica) => {
    setNombre(c.nombre);
    setDescripcion(c.descripcion);
    setGooglePlaceId(c.googlePlaceId);
    setTipoInscripcion(c.tipoInscripcion)
    setActiveStep(activeStep + 1);
    setCantidadParejas(16)
    setConfigEnfrentamiento({
      cantidadPartidos: 4,
      golesParaGanar: 10,
    })
  };

  const handleCrearTorneo = () => {
    const competicion:CompeticionEnCreacion = {
      nombre,
      descripcion, 
      googlePlaceId,
      tipoDeFutbolin,
      modalidadDeJuego,
      tipoInscripcion,
      cantidadParejas,
      enfrentamientos : [],
      equipos: [],
      configEnfrentamiento,
    }
    setCompeticionEnCreacion(competicion)
  }

  return (
    <CrearLigaContext
      value={{
        activeStep,
        setActiveStep,
        modalidadDeJuego,
        tipoDeFutbolin,
        competicionEnCreacion,
        handleCompletarModalidadDeJuego,
        handleCompletarConfigurarLiga,
        handleCompletarDatosBasicos,
        handleCrearTorneo
      }}
    >
      {children}
    </CrearLigaContext>
  );
};

export { CrearLigaContext, CrearLigaProvider };

