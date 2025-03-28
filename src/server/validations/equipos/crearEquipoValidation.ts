import { z } from "zod";

const jugadoresEquipo = z.object({
  usuario: z.string().nullable(),
  nombre: z.string(),
  estado: z.string(),
});

export const crearEquipoSchema = z.object({
  nombreEquipo: z.string().min(1, "El nombre es requerido"),
  imagenEquipo: z.string().optional(),
  jugadores: z.array(jugadoresEquipo),
  createdByUserId: z.string(),
});

export type CompeticionInput = z.infer<typeof crearEquipoSchema>;
