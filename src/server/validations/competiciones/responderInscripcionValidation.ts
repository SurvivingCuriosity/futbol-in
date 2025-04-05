import { z } from "zod";
import { objectIdSchema } from "./agregarCompeticionValidation";

export const responderInscripcionSchema = z.object({
  idCompeticion: objectIdSchema, // ID obligatorio
  idEquipo: objectIdSchema,   // data parcial
  aceptado: z.boolean(),   // data parcial
});


export type ActualizarCompeticionInput = z.infer<typeof responderInscripcionSchema>;
