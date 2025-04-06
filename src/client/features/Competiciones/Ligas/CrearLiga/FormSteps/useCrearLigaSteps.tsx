import { CrearLigaContext } from "@/client/features/Competiciones/Ligas/CrearLiga/context/CrearLigaContext";
import { use } from "react";
import { ModalidadDeJuego } from "../../../common/ModalidadDeJuego/ModalidadDeJuego";
import { ConfigurarLiga } from "./ConfigurarLiga/ConfigurarLiga";
import { DatosBasicosLiga } from "./DatosBasicosLiga";
import { ConfirmarDatosLiga } from "./ConfirmarDatos/ConfirmarDatosLiga";

export const useCrearLigaSteps = () => {
  
  const {
    handleCompletarModalidadDeJuego,
    handleCompletarConfigurarLiga,
    handleCompletarDatosBasicos,
  } = use(CrearLigaContext);

  const steps = [
    {
      t: "Modalidad de juego",
      component: (
        <ModalidadDeJuego onCompleted={handleCompletarModalidadDeJuego} />
      ),
    },
    {
      t: `Configurar Liga`,
      component:<ConfigurarLiga onCompleted={handleCompletarConfigurarLiga}/>
    },
    {
      t: "Datos básicos",
      component: (
        <DatosBasicosLiga onCompleted={handleCompletarDatosBasicos} />
      ),
    },
    {
      t: "Confirmar datos",
      component: (<ConfirmarDatosLiga />),
    }
  ];


  return steps
}
