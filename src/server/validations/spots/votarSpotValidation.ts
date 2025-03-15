import { z } from "zod";

export const votarSpotSchema = z.object({
  spotId: z.string().nonempty("El spotId es requerido"),
  vote: z.enum(["up", "down"]),
});
