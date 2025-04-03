import { EstadoEquipoCompeticion } from "@/core/enum/Competicion/EstadoEquipoCompeticion";
import { ModalidadJuego } from "@/core/enum/Competicion/ModalidadJuego";
import { TipoCompeticion } from "@/core/enum/Competicion/TipoCompeticion";
import { TipoInscripcion } from "@/core/enum/Competicion/TipoInscripcion";
import { TipoFutbolin } from "@/core/enum/Futbolin/TipoFutbolin";
import { z } from "zod";

export const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "El ID debe ser un ObjectId válido de 24 hexadecimales");

export const ConfigEnfrentamientoZod = z.object({
  cantidadPartidos: z.number().min(1, "Debe haber al menos 1 partido"),
  golesParaGanar: z.number().min(1, "Los goles para ganar deben ser >= 1"),
});

export const ConfigEnfrentamientosZod = z.object({
  cantidadPartidos: z.number().min(1),
  golesParaGanar: z.number().min(1),
  excepcionSemiFinales: ConfigEnfrentamientoZod.nullable(),
  excepcionFinal: ConfigEnfrentamientoZod.nullable(),
});

export const EquipoZod = z.object({
  id: objectIdSchema,
  estado: z.nativeEnum(EstadoEquipoCompeticion),
});

// 4. Esquema principal de Competición
export const crearCompeticionSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  descripcion: z.string(),
  googlePlaceId: z.string().min(1, "Se requiere googlePlaceId"),

  tipoDeCompeticion: z.nativeEnum(TipoCompeticion),
  tipoDeFutbolin: z.nativeEnum(TipoFutbolin),
  modalidadDeJuego: z.nativeEnum(ModalidadJuego),
  tipoInscripcion: z.nativeEnum(TipoInscripcion),
  cantidadParejas: z.number(),

  enfrentamientos: z.array(objectIdSchema),
  equipos: z.array(EquipoZod),

  configuracionEnfrentamientos: ConfigEnfrentamientosZod,
});

export type CompeticionInput = z.infer<typeof crearCompeticionSchema>;
