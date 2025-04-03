import { ModalidadJuego } from "@/core/enum/Competicion/ModalidadJuego";
import { TipoCompeticion } from "@/core/enum/Competicion/TipoCompeticion";
import { TipoFutbolin } from "@/core/enum/Futbolin/TipoFutbolin";
import { ConfiguracionLiga } from "../types/ConfiguracionLiga";
import { ConfiguracionTorneo } from "../types/ConfiguracionTorneo";
import { ConfiguracionTorneoClasificatoria } from "../types/ConfiguracionTorneoClasificatoria";
import { ConfiguracionBasica } from "../types/ConfiguracionBasica";
import { CompeticionDTO } from "@/server/models/Competicion/CompeticionDTO";

export interface CrearTorneoContextType {
  activeStep: number;
  setActiveStep: (n: number) => void;

  tipoDeCompeticion: TipoCompeticion;
  modalidadDeJuego: ModalidadJuego;
  tipoDeFutbolin: TipoFutbolin;

  competicionEnCreacion: CompeticionEnCreacion | undefined;

  handleCompletarTipoDeCompeticion: (t: TipoCompeticion) => void;
  handleCompletarModalidadDeJuego: (f: TipoFutbolin, m: ModalidadJuego) => void;
  handleCompletarConfigurarLiga: (c: ConfiguracionLiga) => void;
  handleCompletarConfigurarTorneo: (c: ConfiguracionTorneo) => void;
  handleCompletarConfigurarTorneoClasificatoria: (
    c: ConfiguracionTorneoClasificatoria
  ) => void;
  handleCompletarDatosBasicos: (c: ConfiguracionBasica) => void;
  handleCrearTorneo: () => void;
}

export type CompeticionEnCreacion = Omit<CompeticionDTO, "id" | "createdByUserId" | 'estadoCompeticion'>;