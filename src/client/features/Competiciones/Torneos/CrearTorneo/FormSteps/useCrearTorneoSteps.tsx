import { use } from "react";
import { ModalidadDeJuego } from "../../../Ligas/CrearLiga/FormSteps/ModalidadDeJuego/ModalidadDeJuego";
import { CrearTorneoContext } from "../context/CrearTorneoContext";
import { ConfigurarTorneo } from "./ConfigurarTorneo/ConfigurarTorneo";
import { DatosBasicosTorneo } from "./DatosBasicosTorneo";
import { ConfirmarDatosTorneo } from "./ConfirmarDatos/ConfirmarDatosTorneo";

export const useCrearTorneoSteps = () => {
  
  const {
    handleCompletarModalidadDeJuego,
    handleCompletarConfigurarTorneo,
    handleCompletarDatosBasicos,
  } = use(CrearTorneoContext);

  const steps = [
    {
      t: "Modalidad de juego",
      component: (
        <ModalidadDeJuego onCompleted={handleCompletarModalidadDeJuego} />
      ),
    },
    {
      t: `Configurar torneo`,
      component:<ConfigurarTorneo onCompleted={handleCompletarConfigurarTorneo}/>
    },
    {
      t: "Datos básicos",
      component: (
        <DatosBasicosTorneo onCompleted={handleCompletarDatosBasicos} />
      ),
    },
    {
      t: "Confirmar datos",
      component: (<ConfirmarDatosTorneo />),
    }
  ];


  return steps
}
