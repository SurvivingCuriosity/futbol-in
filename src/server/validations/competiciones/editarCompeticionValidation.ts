import { z } from "zod";
import { ConfigEnfrentamientosZod, objectIdSchema } from "./agregarCompeticionValidation";
import { TipoCompeticion } from "@/core/enum/Competicion/TipoCompeticion";
import { TipoFutbolin } from "@/core/enum/Futbolin/TipoFutbolin";
import { ModalidadJuego } from "@/core/enum/Competicion/ModalidadJuego";
import { TipoInscripcion } from "@/core/enum/Competicion/TipoInscripcion";
import { EstadoCompeticion } from "@/core/enum/Competicion/EstadoCompeticion";
import { EstadoEquipoCompeticion } from "@/core/enum/Competicion/EstadoEquipoCompeticion";


export const competicionSchema = z.object({
  id: objectIdSchema.optional(),

  nombre: z.string().optional(),
  descripcion: z.string().optional(),
  googlePlaceId: z.string().optional(),

  tipoDeCompeticion: z.nativeEnum(TipoCompeticion).optional(),
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

  configuracionEnfrentamientos: ConfigEnfrentamientosZod.optional(),

  createdByUserId: objectIdSchema.optional(),
});

export const actualizarCompeticionSchema = z.object({
  idCompeticion: objectIdSchema, // ID obligatorio
  data: competicionSchema,   // data parcial
});


export type ActualizarCompeticionInput = z.infer<typeof actualizarCompeticionSchema>;
