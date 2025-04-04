import { z } from "zod";
import { objectIdSchema } from "./agregarCompeticionValidation";

export const joinCompeticionSchema = z.object({
  idCompeticion: objectIdSchema, // ID obligatorio
  idEquipo: objectIdSchema,   // data parcial
});


export type ActualizarCompeticionInput = z.infer<typeof joinCompeticionSchema>;
