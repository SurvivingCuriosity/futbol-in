import { ModalidadJuego } from "@/core/enum/Competicion/ModalidadJuego";
import { TipoCompeticion } from "@/core/enum/Competicion/TipoCompeticion";
import { TipoFutbolin } from "@/core/enum/Futbolin/TipoFutbolin";
import React, { createContext, useState } from "react";
import { ConfigEnfrentamientos } from "../FormSteps/Enfrentamientos/FormEnfrentamientos";
import { ConfiguracionBasica } from "../types/ConfiguracionBasica";
import { ConfiguracionLiga } from "../types/ConfiguracionLiga";
import { ConfiguracionTorneo } from "../types/ConfiguracionTorneo";
import { ConfiguracionTorneoClasificatoria } from "../types/ConfiguracionTorneoClasificatoria";
import { CompeticionEnCreacion, CrearTorneoContextType } from "./ContextType";

const CrearTorneoContext = createContext<CrearTorneoContextType>(
  null as unknown as CrearTorneoContextType
);

const CrearTorneoProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeStep, setActiveStep] = useState(0);

  const [nombre, setNombre] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [googlePlaceId, setGooglePlaceId] = useState<string>("");

  const [tipoDeCompeticion, setTipoDeCompeticion] = useState<TipoCompeticion>(
    TipoCompeticion.LIGA
  );
  const [modalidadDeJuego, setModalidadDeJuego] = useState<ModalidadJuego>(
    ModalidadJuego.COMBINADO
  );
  const [tipoDeFutbolin, setTipoDeFutbolin] = useState<TipoFutbolin>(
    TipoFutbolin.TSUNAMI
  );
  const [cantidadParejas, setCantidadParejas] = useState<number>(16);

  const [configuracionEnfrentamientos, setConfiguracionEnfrentamientos] = useState<ConfigEnfrentamientos>({
    cantidadPartidos: 4,
    golesParaGanar: 10,
    excepcionSemiFinales: null,
    excepcionFinal: null,
  });

  const [competicionEnCreacion, setCompeticionEnCreacion] = useState<CompeticionEnCreacion|undefined>()

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

  const handleCompletarConfigurarLiga = (c:ConfiguracionLiga) => {
    setActiveStep(activeStep + 1);
    console.log(c)
  };

  const handleCompletarConfigurarTorneo = (c:ConfiguracionTorneo) => {
    setActiveStep(activeStep + 1);
    setCantidadParejas(c.cantidadParejas)
  };
  
  const handleCompletarConfigurarTorneoClasificatoria = (c: ConfiguracionTorneoClasificatoria) => {
    setActiveStep(activeStep + 1);
    setCantidadParejas(c.cantidadParejas)
    setConfiguracionEnfrentamientos(c.configEnfrentamientosTorneo)
  };

  const handleCompletarDatosBasicos = (c: ConfiguracionBasica) => {
    setNombre(c.nombre);
    setDescripcion(c.descripcion);
    setGooglePlaceId(c.googlePlaceId);
    
  };

  const handleCrearTorneo = () => {
    const competicion:CompeticionEnCreacion = {
      nombre,
      descripcion, 
      googlePlaceId,
      tipoDeCompeticion,
      tipoDeFutbolin,
      modalidadDeJuego,
      cantidadParejas,
      enfrentamientos : [],
      equipos: [],
      configuracionEnfrentamientos,
    }
    setCompeticionEnCreacion(competicion)
  }

  return (
    <CrearTorneoContext
      value={{
        activeStep,
        setActiveStep,
        tipoDeCompeticion,
        modalidadDeJuego,
        tipoDeFutbolin,
        competicionEnCreacion,
        handleCompletarTipoDeCompeticion,
        handleCompletarModalidadDeJuego,
        handleCompletarConfigurarLiga,
        handleCompletarConfigurarTorneo,
        handleCompletarConfigurarTorneoClasificatoria,
        handleCompletarDatosBasicos,
        handleCrearTorneo
      }}
    >
      {children}
    </CrearTorneoContext>
  );
};

export { CrearTorneoContext, CrearTorneoProvider };

