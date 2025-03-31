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
  cantidadParejas: number;
  enfrentamientos: string[];
  equipos: string[];
  configuracionEnfrentamientos: {
    cantidadPartidos: number;
    golesParaGanar: number;
    excepcionSemiFinales: null | { cantidadPartidos: number; golesParaGanar: number };
    excepcionFinal: null | { cantidadPartidos: number; golesParaGanar: number };
  };
  createdByUserId: string;
}