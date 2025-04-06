import { EstadoCompeticion } from "@/core/enum/Competicion/EstadoCompeticion";
import { EstadoEquipoCompeticion } from "@/core/enum/Competicion/EstadoEquipoCompeticion";
import { ModalidadJuego } from "@/core/enum/Competicion/ModalidadJuego";
import { TipoInscripcion } from "@/core/enum/Competicion/TipoInscripcion";
import { TipoFutbolin } from "@/core/enum/Futbolin/TipoFutbolin";
import { z } from "zod";
import { ConfigEnfrentamientoZod, objectIdSchema } from "./agregarLigaValidation";


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

  configEnfrentamiento: ConfigEnfrentamientoZod.optional(),

  createdByUserId: objectIdSchema.optional(),
});

export const editarLigaSchema = z.object({
  idCompeticion: objectIdSchema, // ID obligatorio
  data: competicionSchema,   // data parcial
});


export type ActualizarCompeticionInput = z.infer<typeof editarLigaSchema>;
