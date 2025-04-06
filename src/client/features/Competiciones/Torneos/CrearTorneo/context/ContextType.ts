import { ModalidadJuego } from "@/core/enum/Competicion/ModalidadJuego";
import { TipoFutbolin } from "@/core/enum/Futbolin/TipoFutbolin";
import { TorneoDTO } from "@/server/models/Competicion/Torneos/TorneoDTO";
import { ConfiguracionBasica } from "../types/ConfiguracionBasica";
import { ConfiguracionTorneo } from "../types/ConfiguracionTorneo";
import { ConfiguracionTorneoClasificatoria } from "../types/ConfiguracionTorneoClasificatoria";

export interface CrearTorneoContextType {
  activeStep: number;
  setActiveStep: (n: number) => void;
  modalidadDeJuego: ModalidadJuego;
  tipoDeFutbolin: TipoFutbolin;

  competicionEnCreacion: CompeticionEnCreacion | undefined;

  handleCompletarModalidadDeJuego: (f: TipoFutbolin, m: ModalidadJuego) => void;
  handleCompletarConfigurarTorneo: (c: ConfiguracionTorneo) => void;
  handleCompletarConfigurarTorneoClasificatoria: (
    c: ConfiguracionTorneoClasificatoria
  ) => void;
  handleCompletarDatosBasicos: (c: ConfiguracionBasica) => void;
  handleCrearTorneo: () => void;
}

export type CompeticionEnCreacion = Omit<TorneoDTO, "id" | "createdByUserId" | 'estadoCompeticion'>;