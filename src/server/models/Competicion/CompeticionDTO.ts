import { EstadoCompeticion } from "@/core/enum/Competicion/EstadoCompeticion";
import { EstadoEquipoCompeticion } from "@/core/enum/Competicion/EstadoEquipoCompeticion";
import { ModalidadJuego } from "@/core/enum/Competicion/ModalidadJuego";
import { TipoCompeticion } from "@/core/enum/Competicion/TipoCompeticion";
import { TipoInscripcion } from "@/core/enum/Competicion/TipoInscripcion";
import { TipoFutbolin } from "@/core/enum/Futbolin/TipoFutbolin";

export interface CompeticionDTO {
  id: string;
  nombre: string;
  descripcion: string;
  googlePlaceId: string;
  tipoDeCompeticion: TipoCompeticion;
  tipoDeFutbolin: TipoFutbolin;
  modalidadDeJuego: ModalidadJuego;
  tipoInscripcion: TipoInscripcion;
  estadoCompeticion:EstadoCompeticion;
  cantidadParejas: number;
  enfrentamientos: string[];
  equipos: Array<{id:string, estado:EstadoEquipoCompeticion}>;
  configuracionEnfrentamientos: {
    cantidadPartidos: number;
    golesParaGanar: number;
    excepcionSemiFinales: null | { cantidadPartidos: number; golesParaGanar: number };
    excepcionFinal: null | { cantidadPartidos: number; golesParaGanar: number };
  };
  createdByUserId: string;
}