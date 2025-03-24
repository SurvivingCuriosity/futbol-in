import { z } from "zod";

const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "El ID debe ser un ObjectId válido de 24 hexadecimales");

const ConfigEnfrentamientoZod = z.object({
  cantidadPartidos: z.number().min(1, "Debe haber al menos 1 partido"),
  golesParaGanar: z.number().min(1, "Los goles para ganar deben ser >= 1"),
});

const ConfigEnfrentamientosZod = z.object({
  cantidadPartidos: z.number().min(1),
  golesParaGanar: z.number().min(1),
  excepcionSemiFinales: ConfigEnfrentamientoZod.nullable().optional(),
  excepcionFinal: ConfigEnfrentamientoZod.nullable().optional(),
});

// 4. Esquema principal de Competición
export const crearCompeticionSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  descripcion: z.string().optional(),
  googlePlaceId: z.string().min(1, "Se requiere googlePlaceId"),

  tipoDeCompeticion: z.string().nonempty("El campo 'tipoFutbolin' es requerido."),
  tipoDeFutbolin: z.string().nonempty("El campo 'tipoFutbolin' es requerido."),
  modalidadDeJuego: z.string().nonempty("El campo 'tipoFutbolin' es requerido."),

  cantidadParejas: z.number().nullable().optional(),

  enfrentamientos: z.array(objectIdSchema).optional(),
  equipos: z.array(objectIdSchema).optional(),

  configuracionEnfrentamientos: ConfigEnfrentamientosZod,
});

export type CompeticionInput = z.infer<typeof crearCompeticionSchema>;
