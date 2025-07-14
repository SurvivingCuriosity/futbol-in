import { EstadoCompeticion } from "futbol-in-core/enum";
import { EstadoEquipoCompeticion } from "futbol-in-core/enum";
import { ModalidadJuego } from "futbol-in-core/enum";
import { TipoInscripcion } from "futbol-in-core/enum";
import { TipoFutbolin } from "futbol-in-core/enum";
import { z } from "zod";
import { ConfigEnfrentamientosZod, objectIdSchema } from "./agregarTorneoValidation";


export const competicionSchema = z.object({
  id: objectIdSchema.optional(),

  nombre: z.string().optional(),
  descripcion: z.string().optional(),
  googlePlaceId: z.string().optional(),

  tipoDeFutbolin: z.nativeEnum(TipoFutbolin).optional(),
  modalidadDeJuego: z.nativeEnum(ModalidadJuego).optional(),
  tipoInscripcion: z.nativeEnum(TipoInscripcion).optional(),
  estadoCompeticion: z.nativeEnum(EstadoCompeticion).optional(),

  cantidadParejas: z.number().nullable().optional(),

  // Enfrentamientos como array de IDs
  enfrentamientos: z.array(objectIdSchema).optional(),

  // Equipos como array de objetos { id, estado }
  equipos: z
    .array(
      z.object({
        id: objectIdSchema,
        estado: z.nativeEnum(EstadoEquipoCompeticion),
      })
    )
    .optional(),

  configEnfrentamientos: ConfigEnfrentamientosZod.optional(),

  createdByUserId: objectIdSchema.optional(),
});

export const actualizarTorneoSchema = z.object({
  idCompeticion: objectIdSchema, // ID obligatorio
  data: competicionSchema,   // data parcial
});


export type ActualizarCompeticionInput = z.infer<typeof actualizarTorneoSchema>;
