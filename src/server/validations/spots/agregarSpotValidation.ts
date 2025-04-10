import { z } from "zod";

export const agregarSpotSchema = z.object({
  nombre: z.string().nonempty("El campo 'nombre' es requerido."),
  direccion: z.string().nonempty("El campo 'direccion' es requerido."),
  coordinates: z
    .array(z.number())
    .length(2, "Se requieren 2 valores en 'coordinates' (lng, lat)."),
  googlePlaceId: z.string().nonempty("El campo 'googlePlaceId' es requerido."),
  ciudad: z.string(),
  tipoLugar: z.string().nonempty("El campo 'tipoLugar' es requerido."),
  tipoFutbolin: z.string().nonempty("El campo 'tipoFutbolin' es requerido."),
  comentarios: z.string(),
});
