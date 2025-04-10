import { ModalidadJuego } from "@/core/enum/Competicion/ModalidadJuego";
import { TipoFutbolin } from "@/core/enum/Futbolin/TipoFutbolin";
import { LigaDTO } from "@/server/models/Competicion/Ligas/LigaDTO";
import { ConfiguracionLiga } from "../types/ConfiguracionLiga";
import { ConfiguracionBasica } from "../../../common/types/ConfiguracionBasica";

export interface CrearLigaContextType {
  activeStep: number;
  setActiveStep: (n: number) => void;

  modalidadDeJuego: ModalidadJuego;
  tipoDeFutbolin: TipoFutbolin;

  handleCompletarModalidadDeJuego: (f: TipoFutbolin, m: ModalidadJuego) => void;
  handleCompletarConfigurarLiga: (c: ConfiguracionLiga) => void;
  handleCompletarDatosBasicos: (c: ConfiguracionBasica) => void;
  getCompeticionCrear: () => CompeticionEnCreacion;
}

export type CompeticionEnCreacion = Omit<LigaDTO, "id" | "createdByUserId" | 'estadoCompeticion'>;