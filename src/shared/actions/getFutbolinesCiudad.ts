import Lugar, { ILugar } from "../models/Futbolin.model";

/**
 * Obtiene las coordenadas [longitude, latitude] de una ciudad utilizando la API de Geocoding de Google.
 */
export async function getCityCoordinates(city: string): Promise<[number, number]> {
  const apiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY;
  if (!apiKey) {
    throw new Error("No se ha definido GOOGLE_MAPS_API_KEY en las variables de entorno");
  }
  
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(city)}&key=${apiKey}`;
  
  const response = await fetch(url);
  const data = await response.json();

  if (data.status !== "OK" || !data.results || data.results.length === 0) {
    throw new Error(`No se pudo obtener las coordenadas para la ciudad: ${city}`);
  }
  
  const { location } = data.results[0].geometry;
  // Mongoose espera las coordenadas en el orden [longitud, latitud]
  return [location.lng, location.lat];
}

/**
 * Obtiene los futbolines (lugares) cercanos a la ciudad especificada.
 * Se realiza una consulta geoespacial utilizando el índice 2dsphere definido en el schema.
 */
export async function getFutbolinesByCity(city: string): Promise<ILugar[]> {
  // Primero, obtener las coordenadas de la ciudad.
  const coordinates = await getCityCoordinates(city);
  
  // Definir el radio de búsqueda en metros (por ejemplo, 10 km).
  const searchRadius = 10000;
  
  // Consulta geoespacial: busca lugares cuyo campo `location` esté cerca de las coordenadas.
  const futbolines = await Lugar.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates, // [longitud, latitud]
        },
        $maxDistance: searchRadius,
      },
    },
  });
  
  return futbolines;
}
