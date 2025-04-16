import { z } from "zod";
import { TipoFutbolin } from "@/core/enum/Futbolin/TipoFutbolin";


export const crearPerfilOperadorSchema = z.object({
  usuarios: z.array(z.string()),
  bio: z.string(),
  enlaces: z.array(z.string()),
  nombreComercial: z.string(),
  telefonos: z.array(
    z.object({
      persona: z.string(),
      numero: z.string(),
    })
  ),
  ciudad: z.string(),
  futbolines: z.array(z.nativeEnum(TipoFutbolin)),
  logo: z.string(),
  fondo: z.string(),
});

export type CrearPerfilOperadorRequest = z.infer<typeof crearPerfilOperadorSchema>;
