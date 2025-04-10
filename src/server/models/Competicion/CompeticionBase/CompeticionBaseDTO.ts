import { EstadoCompeticion } from "@/core/enum/Competicion/EstadoCompeticion";
import { ModalidadJuego } from "@/core/enum/Competicion/ModalidadJuego";
import { TipoInscripcion } from "@/core/enum/Competicion/TipoInscripcion";
import { TipoFutbolin } from "@/core/enum/Futbolin/TipoFutbolin";
import { EquipoCompeticionDTO } from "../../Equipo/EquipoCompeticion.model";

export interface CompeticionBaseDTO {
  id: string;
  nombre: string;
  descripcion: string;
  ciudad: string;
  googlePlaceId: string;
  tipoDeFutbolin: TipoFutbolin;
  modalidadDeJuego: ModalidadJuego;
  tipoInscripcion: TipoInscripcion;
  estadoCompeticion: EstadoCompeticion;
  equipos: Array<EquipoCompeticionDTO>;
  cantidadParejas: number;
  createdByUserId?: string;
}
