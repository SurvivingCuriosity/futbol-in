import { z } from "zod";
import { objectIdSchema } from "../torneos/agregarTorneoValidation";

export const joinCompeticionSchema = z.object({
  idCompeticion: objectIdSchema, // ID obligatorio
  idEquipo: objectIdSchema,   // data parcial
});


export type ActualizarCompeticionInput = z.infer<typeof joinCompeticionSchema>;
