import { ModalidadJuego } from "@/core/enum/Competicion/ModalidadJuego";
import { TipoCompeticion } from "@/core/enum/Competicion/TipoCompeticion";
import { TipoFutbolin } from "@/core/enum/Futbolin/TipoFutbolin";

export interface CrearTorneoContextType {
  activeStep: number;
  setActiveStep: (n: number) => void;

  tipoDeCompeticion: TipoCompeticion;
  modalidadDeJuego: ModalidadJuego;
  tipoDeFutbolin: TipoFutbolin;

  handleCompletarTipoDeCompeticion: (t: TipoCompeticion) => void;
  handleCompletarModalidadDeJuego: (f: TipoFutbolin, m: ModalidadJuego) => void;
}
