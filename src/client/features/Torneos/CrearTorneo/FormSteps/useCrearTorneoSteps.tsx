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
    handleCompletarConfigurarLiga,
    handleCompletarConfigurarTorneo,
    handleCompletarConfigurarTorneoClasificatoria,
    handleCompletarDatosBasicos,
    tipoDeCompeticion,
    competicionEnCreacion,
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
          <ConfigurarLiga onCompleted={handleCompletarConfigurarLiga}/>
        ) : tipoDeCompeticion === TipoCompeticion.TORNEO ? (
          <ConfigurarTorneo onCompleted={handleCompletarConfigurarTorneo}/>
        ) : (
          <ConfigurarTorneoClasificatoria onCompleted={handleCompletarConfigurarTorneoClasificatoria}/>
        ),
    },
    {
      t: "Datos básicos",
      component: (
        <DatosBasicos onCompleted={handleCompletarDatosBasicos} />
      ),
    },
    {
      t: "Confirmar datos",
      component: (
        <div>
          <pre>
            {JSON.stringify(competicionEnCreacion, null, 2)}
          </pre>
        </div>
      ),
    }
  ];


  return steps
}
