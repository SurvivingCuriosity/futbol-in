import { ModalidadJuego } from "@/core/enum/Competicion/ModalidadJuego";
import { TipoFutbolin } from "@/core/enum/Futbolin/TipoFutbolin";
import { LigaDTO } from "@/server/models/Competicion/Ligas/LigaDTO";
import { ConfiguracionBasica } from "../types/ConfiguracionBasica";
import { ConfiguracionLiga } from "../types/ConfiguracionLiga";

export interface CrearLigaContextType {
  activeStep: number;
  setActiveStep: (n: number) => void;

  modalidadDeJuego: ModalidadJuego;
  tipoDeFutbolin: TipoFutbolin;

  competicionEnCreacion: CompeticionEnCreacion | undefined;

  handleCompletarModalidadDeJuego: (f: TipoFutbolin, m: ModalidadJuego) => void;
  handleCompletarConfigurarLiga: (c: ConfiguracionLiga) => void;
  handleCompletarDatosBasicos: (c: ConfiguracionBasica) => void;
  handleCrearTorneo: () => void;
}

export type CompeticionEnCreacion = Omit<LigaDTO, "id" | "createdByUserId" | 'estadoCompeticion'>;