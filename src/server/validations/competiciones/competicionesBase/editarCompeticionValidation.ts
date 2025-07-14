import {
  EstadoCompeticion,
  EstadoEquipoCompeticion,
  ModalidadJuego,
  TipoFutbolin,
  TipoInscripcion,
} from "futbol-in-core/enum";
import { z } from "zod";
import { objectIdSchema } from "../torneos/agregarTorneoValidation";

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

  enfrentamientos: z.array(objectIdSchema).optional(),

  equipos: z
    .array(
      z.object({
        id: objectIdSchema,
        estado: z.nativeEnum(EstadoEquipoCompeticion),
      })
    )
    .optional(),
  createdByUserId: objectIdSchema.optional(),
});

export const editarCompeticionSchema = z.object({
  idCompeticion: objectIdSchema, // ID obligatorio
  data: competicionSchema, // data parcial
});

export type ActualizarCompeticionInput = z.infer<
  typeof editarCompeticionSchema
>;
