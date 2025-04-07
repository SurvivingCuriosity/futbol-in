import { z } from "zod";
import { objectIdSchema } from "../torneos/agregarTorneoValidation";

export const joinLigaSchema = z.object({
  idLiga: objectIdSchema,
  idEquipo: objectIdSchema,
});


export type ActualizarCompeticionInput = z.infer<typeof joinLigaSchema>;
