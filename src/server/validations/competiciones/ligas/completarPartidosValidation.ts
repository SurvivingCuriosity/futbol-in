import { z } from "zod";

export const completarPartidosSchema = z.object({
  idLiga: z.string(),
  idEnfrentamiento: z.string(),
  partidos: z.array(
    z.object({
      id: z.string().optional(),
      equipoA: z.string(),
      equipoB: z.string(),
      golesEquipoA: z.number().min(0),
      golesEquipoB: z.number().min(0),
      finalizado: z.boolean(),
      ganador: z.string().nullable(),
    })
  ),
});

export type CompletarPartidosInput = z.infer<typeof completarPartidosSchema>;
