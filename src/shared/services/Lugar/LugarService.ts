import { TipoFutbolin } from "@/shared/enum/Futbolin/TipoFutbolin";
import { TipoLugar } from "@/shared/enum/Lugares/TipoLugar";
import connectDb from "@/shared/lib/db";
import Lugar, { ILugar } from "@/shared/models/Lugar/Lugar.model";
import { LugarDTO } from "@/shared/models/Lugar/LugarDTO"; // Ajusta el path
import { GoogleMapsService } from "@/shared/services/GoogleMaps/GoogleMapsService";

export class LugarService {
  /**
   * Encuentra los lugares cercanos a un placeId de Google, en un radio fijo.
   * Ejemplo: 10km = 10000 metros.
   */
  static async findNearbyByPlaceId(placeId: string): Promise<LugarDTO[]> {
    await connectDb();

    const coordinates = await GoogleMapsService.getCoordinatesFromPlaceId(placeId);
    const searchRadiusMeters = 10000; // 10km

    const lugares = await Lugar.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [coordinates.lng, coordinates.lat],
          },
          $maxDistance: searchRadiusMeters,
        },
      },
    }).lean<ILugar[]>();

    return lugares.map((lugar) => this.mapToDTO(lugar));
  }

  static mapToDTO(lugar: ILugar): LugarDTO {
    return {
      nombre: lugar.nombre,
      direccion: lugar.direccion,
      googlePlaceId: lugar.googlePlaceId,
      location: {
        type: lugar.location.type,
        coordinates: [...lugar.location.coordinates],
      },
      tipoLugar: lugar.tipoLugar as TipoLugar,
      tipoFutbolin: lugar.tipoFutbolin as TipoFutbolin,
      comentarios: lugar.comentarios,
    };
  }
}
