import { ModalidadJuego, TipoFutbolin, TipoInscripcion } from "futbol-in-core/enum";
import React, { createContext, useState } from "react";
import { ConfiguracionBasica } from "../../../common/types/ConfiguracionBasica";
import { ConfigEnfrentamiento } from "../FormSteps/Enfrentamientos/FormEnfrentamientos";
import { ConfiguracionLiga } from "../types/ConfiguracionLiga";
import { CompeticionEnCreacion, CrearLigaContextType } from "./ContextType";
import { TipoCompeticion } from "futbol-in-core/enum";

const CrearLigaContext = createContext<CrearLigaContextType>(
  null as unknown as CrearLigaContextType
);

const CrearLigaProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeStep, setActiveStep] = useState(0);

  const [nombre, setNombre] = useState<string>("");
  const [ciudad, setCiudad] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [googlePlaceId, setGooglePlaceId] = useState<string>("");

  const [idaYVuelta, setIdaYVuelta] = useState<boolean>(false);

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

  const handleCompletarModalidadDeJuego = (
    f: TipoFutbolin,
    m: ModalidadJuego
  ) => {
    setTipoDeFutbolin(f);
    setModalidadDeJuego(m);
    setActiveStep(activeStep + 1);
  };

  const handleCompletarConfigurarLiga = (c:ConfiguracionLiga) => {
    setConfigEnfrentamiento(c.configEnfrentamiento)
    setIdaYVuelta(c.idaYVuelta)
  };

  const handleCompletarDatosBasicos = (c: ConfiguracionBasica) => {
    console.log('Completa datos básicos', c)
    setNombre(c.nombre);
    setDescripcion(c.descripcion);
    setGooglePlaceId(c.googlePlaceId);
    setTipoInscripcion(c.tipoInscripcion)
    setActiveStep(activeStep + 1);
    setCiudad(c.ciudad)
    setCantidadParejas(16)
  };

  const getCompeticionCrear = () => {
    const competicion:CompeticionEnCreacion = {
      nombre,
      descripcion, 
      googlePlaceId,
      ciudad,
      tipoDeFutbolin,
      modalidadDeJuego,
      tipoInscripcion,
      cantidadParejas,
      enfrentamientos : [],
      equipos: [],
      configEnfrentamiento,
      idaYVuelta,
      tipoCompeticion:TipoCompeticion.LIGA
    }
    return competicion
  }

  return (
    <CrearLigaContext
      value={{
        activeStep,
        setActiveStep,
        modalidadDeJuego,
        tipoDeFutbolin,
        handleCompletarModalidadDeJuego,
        handleCompletarConfigurarLiga,
        handleCompletarDatosBasicos,
        getCompeticionCrear
      }}
    >
      {children}
    </CrearLigaContext>
  );
};

export { CrearLigaContext, CrearLigaProvider };

