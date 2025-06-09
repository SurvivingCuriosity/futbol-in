import { z } from "zod";

export const editarSpotSchema = z.object({
  id: z.string().nonempty("El campo 'id' es requerido."),
  nombre: z.string().nonempty("No has introducido el bar o dirección"),
  direccion: z.string().nonempty("El campo 'direccion' es requerido."),
  coordinates: z
    .array(z.number())
    .length(2, "Se requieren 2 valores en 'coordinates' (lng, lat)."),
  googlePlaceId: z.string().nonempty("El campo 'googlePlaceId' es requerido."),
  ciudad: z.string().nonempty("El campo 'ciudad' es requerido."),
  tipoLugar: z.string().nonempty("El campo 'tipoLugar' es requerido."),
  tipoFutbolin: z.string().nonempty("El campo 'tipoFutbolin' es requerido."),
  distribucion: z.string().nonempty("El campo 'distribucion' es requerido."),
  comentarios: z.string(),
});
