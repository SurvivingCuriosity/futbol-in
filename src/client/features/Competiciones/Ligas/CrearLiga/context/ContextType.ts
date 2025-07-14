import { LigaDTO } from "futbol-in-core/types";
import { ConfiguracionLiga } from "../types/ConfiguracionLiga";
import { ConfiguracionBasica } from "../../../common/types/ConfiguracionBasica";
import { ModalidadJuego, TipoFutbolin } from "futbol-in-core/enum";

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