import { EstadoEquipoCompeticion } from "futbol-in-core/enum";
import { ModalidadJuego } from "futbol-in-core/enum";
import { TipoCompeticion } from "futbol-in-core/enum";
import { TipoInscripcion } from "futbol-in-core/enum";
import { TipoFutbolin } from "futbol-in-core/enum";
import { z } from "zod";

export const objectIdSchema = z
  .string()
  .regex(
    /^[0-9a-fA-F]{24}$/,
    "El ID debe ser un ObjectId válido de 24 hexadecimales"
  );

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
export const crearTorneoSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  descripcion: z.string(),
  googlePlaceId: z.string().min(1, "Se requiere googlePlaceId"),
  ciudad: z.string(),

  tipoCompeticion: z.nativeEnum(TipoCompeticion),
  tipoDeFutbolin: z.nativeEnum(TipoFutbolin),
  modalidadDeJuego: z.nativeEnum(ModalidadJuego),
  tipoInscripcion: z.nativeEnum(TipoInscripcion),
  cantidadParejas: z.number(),

  enfrentamientos: z.array(objectIdSchema),
  equipos: z.array(EquipoZod),

  configEnfrentamientos: ConfigEnfrentamientosZod,
});

export type CompeticionInput = z.infer<typeof crearTorneoSchema>;
