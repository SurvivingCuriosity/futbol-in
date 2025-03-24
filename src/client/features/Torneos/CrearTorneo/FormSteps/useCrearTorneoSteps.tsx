import { use } from "react";
import { CrearTorneoContext } from "../context/CrearTorneoContext";
import { TipoDeCompeticion } from "./TipoDeCompeticion/TipoDeCompeticion";
import { ModalidadDeJuego } from "./ModalidadDeJuego/ModalidadDeJuego";
import { ConfigurarLiga } from "./ConfigurarLiga/ConfigurarLiga";
import { ConfigurarTorneo } from "./ConfigurarTorneo/ConfigurarTorneo";
import { ConfigurarTorneoClasificatoria } from "./ConfigurarTorneoClasificatoria/ConfigurarTorneoClasificatoria";
import { DatosBasicos } from "./DatosBasicos";
import { TipoCompeticion } from "@/core/enum/Competicion/TipoCompeticion";

export const useCrearTorneoSteps = () => {
  
  const {
    handleCompletarModalidadDeJuego,
    handleCompletarTipoDeCompeticion,
    tipoDeCompeticion,
  } = use(CrearTorneoContext);

  const steps = [
    {
      t: "Tipo de competición",
      component: (
        <TipoDeCompeticion onCompleted={handleCompletarTipoDeCompeticion} />
      ),
    },
    {
      t: "Modalidad de juego",
      component: (
        <ModalidadDeJuego onCompleted={handleCompletarModalidadDeJuego} />
      ),
    },
    {
      t: `Configurar ${tipoDeCompeticion}`,
      component:
        tipoDeCompeticion === TipoCompeticion.LIGA ? (
          <ConfigurarLiga />
        ) : tipoDeCompeticion === TipoCompeticion.TORNEO ? (
          <ConfigurarTorneo />
        ) : (
          <ConfigurarTorneoClasificatoria />
        ),
    },
    {
      t: "Datos básicos",
      component: (
        <DatosBasicos onCompleted={()=>{}} />
      ),
    },
    { t: "Inscripciones", component: <div>2</div> },
  ];


  return steps
}
