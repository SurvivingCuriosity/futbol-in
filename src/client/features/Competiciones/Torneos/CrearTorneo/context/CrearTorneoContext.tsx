import { ModalidadJuego } from "@/core/enum/Competicion/ModalidadJuego";
import { TipoInscripcion } from "@/core/enum/Competicion/TipoInscripcion";
import { TipoFutbolin } from "@/core/enum/Futbolin/TipoFutbolin";
import React, { createContext, useState } from "react";
import { ConfigEnfrentamientos } from "../../../common/Enfrentamientos/FormEnfrentamientos";
import { ConfiguracionBasica } from "../../../common/types/ConfiguracionBasica";
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

  const [configEnfrentamientos, setConfigEnfrentamientos] = useState<ConfigEnfrentamientos>({
    cantidadPartidos: 4,
    golesParaGanar: 10,
    excepcionSemiFinales: null,
    excepcionFinal: null,
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
  const handleCompletarConfigurarTorneo = (c:ConfiguracionTorneo) => {
    setActiveStep(activeStep + 1);
    setCantidadParejas(c.cantidadParejas)
  };
  
  const handleCompletarConfigurarTorneoClasificatoria = (c: ConfiguracionTorneoClasificatoria) => {
    setActiveStep(activeStep + 1);
    setCantidadParejas(c.cantidadParejas)
    setConfigEnfrentamientos(c.configEnfrentamientosTorneo)
  };

  const handleCompletarDatosBasicos = (c: ConfiguracionBasica) => {
    setNombre(c.nombre);
    setDescripcion(c.descripcion);
    setGooglePlaceId(c.googlePlaceId);
    setTipoInscripcion(c.tipoInscripcion)
    setActiveStep(activeStep + 1);
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
      configEnfrentamientos,
    }
    setCompeticionEnCreacion(competicion)
  }

  return (
    <CrearTorneoContext
      value={{
        activeStep,
        setActiveStep,
        modalidadDeJuego,
        tipoDeFutbolin,
        competicionEnCreacion,
        handleCompletarModalidadDeJuego,
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

