import { TorneoDTO } from "futbol-in-core/types";
import { ConfiguracionBasica } from "../../../common/types/ConfiguracionBasica";
import { ConfiguracionTorneo } from "../types/ConfiguracionTorneo";
import { ConfiguracionTorneoClasificatoria } from "../types/ConfiguracionTorneoClasificatoria";
import { ModalidadJuego, TipoFutbolin } from "futbol-in-core/enum";

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